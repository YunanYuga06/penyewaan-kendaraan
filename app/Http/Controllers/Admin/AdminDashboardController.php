<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pemesanan;
use App\Models\Kendaraan;
use App\Models\Pembayaran;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $totalKendaraan = Kendaraan::count();
        $kendaraanTersedia = Kendaraan::where('status', 'Tersedia')->count();
        $totalPemesanan = Pemesanan::count();
        $pemesananAktif = Pemesanan::where('status_pesanan', 'Aktif')->count();
        $pendingVerifikasi = Pembayaran::where('status_bayar', 'Menunggu')->count();
        $totalPendapatan = Pembayaran::where('status_bayar', 'Tervalidasi')->sum('nominal');

        $recentPemesanan = Pemesanan::with(['penyewa.user', 'kendaraan'])
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalKendaraan' => $totalKendaraan,
                'kendaraanTersedia' => $kendaraanTersedia,
                'totalPemesanan' => $totalPemesanan,
                'pemesananAktif' => $pemesananAktif,
                'pendingVerifikasi' => $pendingVerifikasi,
                'totalPendapatan' => $totalPendapatan,
            ],
            'recentPemesanan' => $recentPemesanan,
        ]);
    }
}
