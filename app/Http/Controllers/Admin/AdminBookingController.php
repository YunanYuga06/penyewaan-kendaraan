<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pembayaran;
use App\Models\Pemesanan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminBookingController extends Controller
{
    public function index()
    {
        $pemesanan = Pemesanan::with(['penyewa.user', 'kendaraan', 'pembayaran'])
            ->latest()
            ->paginate(15);

        return Inertia::render('Admin/Bookings/Index', [
            'pemesanan' => $pemesanan,
        ]);
    }

    public function verifyPayment(Request $request, Pembayaran $pembayaran)
    {
        $validated = $request->validate([
            'status_bayar' => 'required|in:Tervalidasi,Gagal',
        ]);

        $pembayaran->update(['status_bayar' => $validated['status_bayar']]);

        if ($validated['status_bayar'] === 'Tervalidasi') {
            $pemesanan = $pembayaran->pemesanan;

            if ($pemesanan->status_pesanan === 'Pending') {
                $pemesanan->update(['status_pesanan' => 'Aktif']);
                $pemesanan->kendaraan->update(['status' => 'Disewa']);
            }
        }

        return back()->with('success', 'Pembayaran berhasil diverifikasi.');
    }

    public function updateStatus(Request $request, Pemesanan $pemesanan)
    {
        $validated = $request->validate([
            'status_pesanan' => 'required|in:Pending,Aktif,Selesai,Batal',
        ]);

        $pemesanan->update($validated);

        if ($validated['status_pesanan'] === 'Selesai') {
            $pemesanan->kendaraan->update(['status' => 'Tersedia']);
        } elseif ($validated['status_pesanan'] === 'Batal') {
            $pemesanan->kendaraan->update(['status' => 'Tersedia']);
        }

        return back()->with('success', 'Status pesanan berhasil diperbarui.');
    }
}
