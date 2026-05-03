<?php

namespace App\Http\Controllers;

use App\Models\Pemesanan;
use App\Models\Penyewa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function riwayat()
    {
        $user = Auth::user();
        $penyewa = Penyewa::where('user_id', $user->id)->first();

        if (!$penyewa) {
            return Inertia::render('Dashboard/Riwayat', [
                'pemesanan' => collect(),
            ]);
        }

        $pemesanan = Pemesanan::with(['kendaraan', 'pembayaran'])
            ->where('penyewa_id', $penyewa->id)
            ->latest()
            ->paginate(10);

        return Inertia::render('Dashboard/Riwayat', [
            'pemesanan' => $pemesanan,
        ]);
    }

    public function show(int $id)
    {
        $user = Auth::user();
        $penyewa = Penyewa::where('user_id', $user->id)->first();

        if (!$penyewa) {
            abort(403);
        }

        $pemesanan = Pemesanan::with(['kendaraan.galeri', 'pembayaran', 'layanan'])
            ->where('penyewa_id', $penyewa->id)
            ->findOrFail($id);

        return Inertia::render('Dashboard/RiwayatShow', [
            'pemesanan' => $pemesanan,
        ]);
    }
}
