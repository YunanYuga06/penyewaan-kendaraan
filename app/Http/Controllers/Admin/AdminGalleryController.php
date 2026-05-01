<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kendaraan;
use App\Models\GaleriKendaraan;
use App\Services\FileUploadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminGalleryController extends Controller
{
    public function __construct(
        protected FileUploadService $fileUploadService
    ) {}

    public function store(Request $request, Kendaraan $kendaraan)
    {
        $validated = $request->validate([
            'foto' => 'required|file|mimes:jpg,jpeg,png|max:2048',
            'kategori_foto' => 'nullable|string|max:100',
            'is_utama' => 'boolean',
        ]);

        if ($validated['is_utama'] ?? false) {
            GaleriKendaraan::where('kendaraan_id', $kendaraan->id)
                ->update(['is_utama' => false]);
        }

        $url = $this->fileUploadService->upload('foto', 'galeri_kendaraan');

        $kendaraan->galeri()->create([
            'url_foto' => $url,
            'kategori_foto' => $validated['kategori_foto'] ?? null,
            'is_utama' => $validated['is_utama'] ?? false,
        ]);

        return back()->with('success', 'Foto berhasil ditambahkan.');
    }

    public function destroy(GaleriKendaraan $galeri)
    {
        try {
            $this->fileUploadService->delete($galeri->url_foto);
        } catch (\Exception $e) {
        }

        $galeri->delete();

        return back()->with('success', 'Foto berhasil dihapus.');
    }
}
