<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminVehicleController;
use App\Http\Controllers\Admin\AdminGalleryController;
use App\Http\Controllers\Admin\AdminBookingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Public Routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/katalog', [CatalogController::class, 'index'])->name('catalog.index');
Route::get('/kendaraan/{id}', [CatalogController::class, 'show'])->name('catalog.show');
Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

// Protected Routes (Penyewa)
Route::middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified', 'role:penyewa'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/profile/dashboard', function () {
        return Inertia::render('Profile/UserDashboard', [
            'riwayat' => App\Models\Pemesanan::with('kendaraan')->where('penyewa_id', auth()->user()->penyewa?->id)->latest()->get(),
        ]);
    })->name('profile.dashboard');

    Route::post('/checkout', [BookingController::class, 'store'])->name('checkout');
    Route::get('/dashboard/riwayat', [DashboardController::class, 'riwayat'])->name('dashboard.riwayat');
    Route::post('/pembayaran/upload/{pemesanan}', [PaymentController::class, 'uploadBukti'])->name('payment.upload');
});

// Admin Routes
Route::middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::resource('/kendaraan', AdminVehicleController::class)->except(['show']);
    Route::post('/kendaraan/{kendaraan}/galeri', [AdminGalleryController::class, 'store'])->name('galeri.store');
    Route::delete('/galeri/{galeri}', [AdminGalleryController::class, 'destroy'])->name('galeri.destroy');
    Route::get('/pemesanan', [AdminBookingController::class, 'index'])->name('pemesanan.index');
    Route::put('/pembayaran/{pembayaran}/verifikasi', [AdminBookingController::class, 'verifyPayment'])->name('pembayaran.verifikasi');
    Route::put('/pemesanan/{pemesanan}/status', [AdminBookingController::class, 'updateStatus'])->name('pemesanan.status');
});
