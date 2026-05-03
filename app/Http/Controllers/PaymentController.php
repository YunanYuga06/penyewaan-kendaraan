<?php

namespace App\Http\Controllers;

use App\Models\Pemesanan;
use App\Services\FileUploadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    public function __construct(
        protected FileUploadService $fileUploadService
    ) {}

    public function uploadBukti(Request $request, int $pemesananId)
    {
        $validated = $request->validate([
            'bukti_transfer' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'ktp' => 'nullable|file|mimes:jpg,jpeg,png|max:2048',
        ]);

        $pemesanan = Pemesanan::with('pembayaran')->findOrFail($pemesananId);

        $penyewa = $pemesanan->penyewa;
        if ($penyewa->user_id !== Auth::id()) {
            abort(403);
        }

        if ($pemesanan->pembayaran->where('status_bayar', '!=', 'Ditolak')->isNotEmpty()) {
            return back()->withErrors(['error' => 'Bukti pembayaran sudah diunggah.']);
        }

        $buktiUrl = $this->fileUploadService->upload('bukti_transfer', 'bukti_transfer');

        $ktpUrl = null;
        if ($request->hasFile('ktp')) {
            $ktpUrl = $this->fileUploadService->upload('ktp', 'ktp');
        }

        $dpAmount = $pemesanan->total_biaya * 0.25;

        $pemesanan->pembayaran()->create([
            'jenis_bayar' => 'DP',
            'metode_bayar' => 'Transfer Bank',
            'nominal' => $dpAmount,
            'bukti_transfer' => $buktiUrl,
            'status_bayar' => 'Menunggu',
            'tgl_bayar' => now(),
        ]);

        if ($ktpUrl) {
            $pemesanan->update(['ktp_url' => $ktpUrl]);
        }

        return redirect()->route('checkout-success', $pemesanan->id)
            ->with('success', 'Bukti pembayaran berhasil diunggah.');
    }
}