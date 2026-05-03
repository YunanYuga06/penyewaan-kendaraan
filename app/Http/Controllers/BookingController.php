<?php

namespace App\Http\Controllers;

use App\Models\Pemesanan;
use App\Models\Penyewa;
use App\Models\Kendaraan;
use App\Models\LayananTambahan;
use App\Services\PemesananService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    public function __construct(
        protected PemesananService $pemesananService
    ) {}

    public function store(Request $request)
    {
        $user = Auth::user();
        $penyewa = $user->penyewa;

        if (!$penyewa || empty($penyewa->nik) || empty($penyewa->no_hp) || empty($penyewa->alamat)) {
            return back()->withErrors(['error' => 'Silakan lengkapi profil penyewa (NIK, No HP, Alamat) terlebih dahulu.'])->with('profile_incomplete', true);
        }

        $validated = $request->validate([
            'kendaraan_id' => 'required|exists:kendaraan,id',
            'tgl_sewa' => 'required|date|after:now',
            'tgl_kembali_rencana' => 'required|date|after:tgl_sewa',
            'area_penjemputan' => 'required|string',
            'detail_alamat' => 'required|string',
            'cakupan_wilayah' => 'required|string',
            'layanan_ids' => 'array',
            'layanan_ids.*' => 'exists:layanan_tambahan,id',
        ]);

        $kendaraan = Kendaraan::findOrFail($validated['kendaraan_id']);

        $addOnsTotal = 0;
        if (!empty($validated['layanan_ids'])) {
            $addOnsTotal = LayananTambahan::whereIn('id', $validated['layanan_ids'])->sum('harga');
        }

        $totalCost = $this->pemesananService->calculateTotalCost(
            Carbon::parse($validated['tgl_sewa']),
            Carbon::parse($validated['tgl_kembali_rencana']),
            $kendaraan->harga_sewa_per_hari,
            $addOnsTotal
        );

        $pemesanan = Pemesanan::create([
            'penyewa_id' => $penyewa->id,
            'kendaraan_id' => $kendaraan->id,
            'tgl_sewa' => $validated['tgl_sewa'],
            'tgl_kembali_rencana' => $validated['tgl_kembali_rencana'],
            'area_penjemputan' => $validated['area_penjemputan'],
            'detail_alamat' => $validated['detail_alamat'],
            'cakupan_wilayah' => $validated['cakupan_wilayah'],
            'status_pesanan' => 'Pending',
            'total_biaya' => $totalCost,
        ]);

        if (!empty($validated['layanan_ids'])) {
            $layanan = LayananTambahan::whereIn('id', $validated['layanan_ids'])->get();
            foreach ($layanan as $l) {
                $pemesanan->layanan()->attach($l->id, ['harga_saat_dipesan' => $l->harga]);
            }
        }

        return redirect()->route('checkout.payment', $pemesanan->id)
            ->with('success', 'Pemesanan berhasil dibuat. Silakan upload bukti pembayaran.');
    }
}
