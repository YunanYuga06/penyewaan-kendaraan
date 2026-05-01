<?php

namespace App\Http\Controllers;

use App\Models\Kendaraan;
use App\Models\LayananTambahan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CatalogController extends Controller
{
    public function index(Request $request)
    {
        $query = Kendaraan::with('galeri')
            ->where('status', 'Tersedia');

        if ($request->filled('merk')) {
            $query->where('merk', $request->merk);
        }

        if ($request->filled('min_price')) {
            $query->where('harga_sewa_per_jam', '>=', $request->min_price);
        }

        if ($request->filled('max_price')) {
            $query->where('harga_sewa_per_jam', '<=', $request->max_price);
        }

        $vehicles = $query->orderBy('harga_sewa_per_jam')->paginate(12);

        return Inertia::render('Catalog/Index', [
            'vehicles' => $vehicles,
            'filters' => $request->only(['merk', 'min_price', 'max_price']),
        ]);
    }

    public function show(int $id)
    {
        $vehicle = Kendaraan::with('galeri')
            ->findOrFail($id);

        if ($vehicle->status !== 'Tersedia') {
            abort(404, 'Kendaraan tidak tersedia.');
        }

        $vehicle->load(['galeri' => function ($q) {
            $q->orderBy('is_utama', 'desc');
        }]);

        $addOns = LayananTambahan::all();

        return Inertia::render('Catalog/Show', [
            'vehicle' => $vehicle,
            'addOns' => $addOns,
        ]);
    }
}
