<?php

namespace App\Http\Controllers;

use App\Models\Pemesanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function dashboard()
    {
        $user = Auth::user();
        $penyewa = $user->penyewa;

        $riwayat = Pemesanan::with('kendaraan')
            ->where('penyewa_id', $penyewa?->id)
            ->latest()
            ->get();

        $stats = [
            'total' => $riwayat->count(),
            'selesai' => $riwayat->where('status_pesanan', 'Selesai')->count(),
            'aktif' => $riwayat->whereIn('status_pesanan', ['Pending', 'Dikonfirmasi', 'Sedang Disewa'])->count(),
        ];

        return Inertia::render('Profile/UserDashboard', [
            'auth' => [
                'user' => $user->only(['id', 'name', 'email']),
                'penyewa' => $penyewa,
            ],
            'bookings' => $riwayat,
            'stats' => $stats,
        ]);
    }

    public function history()
    {
        $user = Auth::user();
        $penyewa = $user->penyewa;

        $bookings = Pemesanan::with('kendaraan')
            ->where('penyewa_id', $penyewa?->id)
            ->latest()
            ->paginate(10);

        return Inertia::render('Profile/History', [
            'auth' => [
                'user' => $user->only(['id', 'name', 'email']),
                'penyewa' => $penyewa,
            ],
            'bookings' => $bookings,
        ]);
    }

    public function edit()
    {
        $user = Auth::user();

        return Inertia::render('Profile/Edit', [
            'auth' => [
                'user' => $user->only(['id', 'name', 'email']),
                'penyewa' => $user->penyewa,
            ],
        ]);
    }

    public function update(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'nik' => 'nullable|string|max:16',
            'no_hp' => 'nullable|string|max:20',
            'alamat' => 'nullable|string',
            'no_darurat' => 'nullable|string|max:20',
        ]);

        $user->update([
            'name' => $validated['name'],
        ]);

        $penyewaData = array_filter([
            'nik' => $validated['nik'] ?? null,
            'no_hp' => $validated['no_hp'] ?? null,
            'alamat' => $validated['alamat'] ?? null,
            'no_darurat' => $validated['no_darurat'] ?? null,
        ], fn($v) => $v !== null);

        if (!empty($penyewaData)) {
            $user->penyewa()->updateOrCreate(
                ['user_id' => $user->id],
                $penyewaData
            );
        }

        return back()->with('success', 'Profil berhasil diperbarui.');
    }
}