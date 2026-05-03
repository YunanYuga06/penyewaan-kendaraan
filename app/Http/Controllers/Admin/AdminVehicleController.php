<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kendaraan;
use App\Models\GaleriKendaraan;
use App\Services\KendaraanService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminVehicleController extends Controller
{
    public function __construct(
        protected KendaraanService $kendaraanService
    ) {}

    public function index()
    {
        $vehicles = Kendaraan::with(['galeri', 'fotoUtama'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Vehicles/Index', [
            'vehicles' => $vehicles,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Vehicles/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'plat_nomor' => 'required|string|unique:kendaraan,plat_nomor',
            'merk' => 'required|string|max:100',
            'jenis' => 'nullable|string|max:50',
            'status' => 'required|in:Tersedia,Disewa,Maintenance',
            'harga_sewa_per_hari' => 'required|numeric|min:0',
            'photos.*' => 'nullable|image|max:2048',
        ]);

        $kendaraan = Kendaraan::create($validated);

        if ($request->hasFile('photos')) {
            $isFirst = true;
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store('galeri', 'public');
                GaleriKendaraan::create([
                    'kendaraan_id' => $kendaraan->id,
                    'url_foto' => $path,
                    'is_utama' => $isFirst,
                ]);
                $isFirst = false;
            }
        }

        $this->kendaraanService->checkMaintenanceStatus($kendaraan);

        return redirect()->route('admin.kendaraan.index')
            ->with('success', 'Kendaraan berhasil ditambahkan.');
    }

    public function edit(Kendaraan $kendaraan)
    {
        return Inertia::render('Admin/Vehicles/Edit', [
            'vehicle' => $kendaraan,
        ]);
    }

    public function update(Request $request, Kendaraan $kendaraan)
    {
        $validated = $request->validate([
            'plat_nomor' => 'required|string|unique:kendaraan,plat_nomor,' . $kendaraan->id,
            'merk' => 'required|string|max:100',
            'jenis' => 'nullable|string|max:50',
            'status' => 'required|in:Tersedia,Disewa,Maintenance',
            'harga_sewa_per_hari' => 'required|numeric|min:0',
            'photos.*' => 'nullable|image|max:2048',
        ]);

        $kendaraan->update($validated);

        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store('galeri', 'public');
                GaleriKendaraan::create([
                    'kendaraan_id' => $kendaraan->id,
                    'url_foto' => $path,
                ]);
            }
        }

        $this->kendaraanService->checkMaintenanceStatus($kendaraan);

        return redirect()->route('admin.kendaraan.index')
            ->with('success', 'Kendaraan berhasil diperbarui.');
    }

    public function destroy(Kendaraan $kendaraan)
    {
        $kendaraan->delete();

        return redirect()->route('admin.kendaraan.index')
            ->with('success', 'Kendaraan berhasil dihapus.');
    }
}
