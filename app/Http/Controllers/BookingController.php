<?php

namespace App\Http\Controllers;

use App\Models\Pemesanan;
use App\Models\Penyewa;
use App\Models\Kendaraan;
use App\Models\LayananTambahan;
use App\Services\PemesananService;
use App\Services\FileUploadService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function __construct(
        protected PemesananService $pemesananService,
        protected FileUploadService $fileUploadService
    ) {}

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kendaraan_id' => 'required|exists:kendaraan,id',
            'tgl_sewa' => 'required|date|after:now',
            'tgl_kembali_rencana' => 'required|date|after:tgl_sewa',
            'lokasi_antar' => 'required|string',
            'layanan_ids' => 'array',
            'layanan_ids.*' => 'exists:layanan_tambahan,id',
            'bukti_transfer' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        $user = Auth::user();
        $penyewa = Penyewa::where('user_id', $user->id)->first();

        if (!$penyewa) {
            return back()->withErrors(['error' => 'Silakan lengkapi profil penyewa terlebih dahulu.']);
        }

        $kendaraan = Kendaraan::findOrFail($validated['kendaraan_id']);

        $addOnsTotal = 0;
        if (!empty($validated['layanan_ids'])) {
            $addOnsTotal = LayananTambahan::whereIn('id', $validated['layanan_ids'])->sum('harga');
        }

        $totalCost = $this->pemesananService->calculateTotalCost(
            Carbon::parse($validated['tgl_sewa']),
            Carbon::parse($validated['tgl_kembali_rencana']),
            $kendaraan->harga_sewa_per_jam,
            $addOnsTotal
        );

        $buktiUrl = $this->fileUploadService->upload('bukti_transfer', 'bukti_transfer');

        $pemesanan = Pemesanan::create([
            'penyewa_id' => $penyewa->id,
            'kendaraan_id' => $kendaraan->id,
            'tgl_sewa' => $validated['tgl_sewa'],
            'tgl_kembali_rencana' => $validated['tgl_kembali_rencana'],
            'lokasi_antar' => $validated['lokasi_antar'],
            'status_pesanan' => 'Pending',
            'total_biaya' => $totalCost,
        ]);

        if (!empty($validated['layanan_ids'])) {
            $layanan = LayananTambahan::whereIn('id', $validated['layanan_ids'])->get();
            foreach ($layanan as $l) {
                $pemesanan->layanan()->attach($l->id, ['harga_saat_dipesan' => $l->harga]);
            }
        }

        $pemesanan->pembayaran()->create([
            'jenis_bayar' => 'DP',
            'metode_bayar' => 'Transfer Bank',
            'nominal' => $this->pemesananService->calculateDP($totalCost),
            'bukti_transfer' => $buktiUrl,
            'status_bayar' => 'Menunggu',
            'tgl_bayar' => now(),
        ]);

        return redirect()->route('dashboard.riwayat')
            ->with('success', 'Pemesanan berhasil dibuat. Menunggu verifikasi pembayaran.');
    }
}
