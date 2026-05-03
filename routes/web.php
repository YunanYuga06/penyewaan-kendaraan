<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProfileController;
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
Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');
Route::post('/contact', function () {
    request()->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|max:255',
        'subject' => 'required|string|max:255',
        'message' => 'required|string|max:2000',
    ]);

    return back()->with('success', 'Pesan berhasil dikirim!');
})->name('contact.submit');

// Protected Routes (Penyewa)
Route::middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified', 'role:penyewa'])->group(function () {
    Route::get('/dashboard', function () {
        return redirect()->route('profile.dashboard');
    })->name('dashboard');

    Route::get('/profile/dashboard', [ProfileController::class, 'dashboard'])->name('profile.dashboard');
    Route::get('/profile/history', [ProfileController::class, 'history'])->name('profile.history');
    Route::get('/profile/settings', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile/settings', [ProfileController::class, 'update'])->name('profile.update');

    Route::get('/checkout/{kendaraan_id}', function ($id) {
        $user = auth()->user();
        $penyewa = $user->penyewa;

        $profileComplete = $penyewa && !empty($penyewa->nik) && !empty($penyewa->no_hp) && !empty($penyewa->alamat);

        if (!$profileComplete) {
            return redirect()->route('profile.edit')->with('error', 'Silakan lengkapi profil penyewa (NIK, No HP, Alamat) terlebih dahulu.');
        }

        return Inertia::render('Checkout/Create', [
            'kendaraan' => App\Models\Kendaraan::with('galeri')->findOrFail($id),
            'addOns' => App\Models\LayananTambahan::all(),
        ]);
    })->name('checkout.create');
    Route::post('/checkout', [BookingController::class, 'store'])->name('checkout');
    Route::get('/checkout/pembayaran/{pemesanan}', function ($id) {
        return Inertia::render('Checkout/Payment', [
            'pemesanan' => App\Models\Pemesanan::with(['kendaraan', 'pembayaran'])->findOrFail($id),
        ]);
    })->name('checkout.payment');
    Route::get('/checkout/success/{pemesanan_id}', function ($id) {
        return Inertia::render('Checkout/Success', [
            'pemesanan' => App\Models\Pemesanan::with('kendaraan')->findOrFail($id),
        ]);
    })->name('checkout-success');
    Route::get('/dashboard/riwayat', [DashboardController::class, 'riwayat'])->name('dashboard.riwayat');
    Route::get('/dashboard/riwayat/{pemesanan_id}', [DashboardController::class, 'show'])->name('dashboard.riwayat.show');
    Route::post('/pembayaran/upload/{pemesanan}', [PaymentController::class, 'uploadBukti'])->name('payment.upload');
});

// Admin Routes
Route::middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::resource('/kendaraan', AdminVehicleController::class)->except(['show']);
    Route::post('/kendaraan/{kendaraan}/galeri', [AdminGalleryController::class, 'store'])->name('galeri.store');
    Route::delete('/galeri/{galeri}', [AdminGalleryController::class, 'destroy'])->name('galeri.destroy');
    Route::get('/pemesanan', [AdminBookingController::class, 'index'])->name('pemesanan.index');
    Route::get('/pembayaran', [AdminBookingController::class, 'paymentsIndex'])->name('pembayaran.index');
    Route::put('/pembayaran/{pembayaran}/verifikasi', [AdminBookingController::class, 'verifyPayment'])->name('pembayaran.verifikasi');
    Route::put('/pemesanan/{pemesanan}/status', [AdminBookingController::class, 'updateStatus'])->name('pemesanan.status');
    Route::get('/pemesanan/{pemesanan}', [AdminBookingController::class, 'show'])->name('pemesanan.show');
});