<?php

namespace App\Http\Controllers;

use App\Models\Pembayaran;
use App\Models\Pemesanan;
use App\Services\FileUploadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function __construct(
        protected FileUploadService $fileUploadService
    ) {}

    public function uploadBukti(Request $request, int $pemesananId)
    {
        $validated = $request->validate([
            'bukti_transfer' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'jenis_bayar' => 'required|in:DP,Pelunasan,Denda',
        ]);

        $pemesanan = Pemesanan::findOrFail($pemesananId);

        $penyewa = $pemesanan->penyewa;
        if ($penyewa->user_id !== Auth::id()) {
            abort(403);
        }

        $buktiUrl = $this->fileUploadService->upload('bukti_transfer', 'bukti_transfer');

        $pemesanan->pembayaran()->create([
            'jenis_bayar' => $validated['jenis_bayar'],
            'metode_bayar' => 'Transfer Bank',
            'nominal' => $pemesanan->total_biaya,
            'bukti_transfer' => $buktiUrl,
            'status_bayar' => 'Menunggu',
            'tgl_bayar' => now(),
        ]);

        return back()->with('success', 'Bukti pembayaran berhasil diunggah.');
    }
}
