<?php

namespace App\Http\Controllers;

use App\Models\Kendaraan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $featured = Kendaraan::where('status', 'Tersedia')
            ->with('galeri')
            ->take(6)
            ->get();

        return Inertia::render('Home/Index', [
            'featuredVehicles' => $featured,
            'searchQuery' => $request->input('q', ''),
        ]);
    }
}
