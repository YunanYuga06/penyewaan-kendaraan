SYSTEM ARCHITECTURE & DEVELOPMENT BLUEPRINT
Project Name: Sistem Manajemen Penyewaan Kendaraan (Vehicle Rental System)
Architecture Style: Monolithic SPA (Single Page Application)
Target Environment: Web Application

1. TECHNOLOGY STACK
   AI Agent MUST strictly adhere to the following technology stack:

Backend Framework: Laravel (Latest Stable Version)

Frontend Framework: React.js (Functional Components, Hooks)

Routing & Bridge: Inertia.js

Authentication: Laravel Jetstream (Inertia + React Stack)

Styling: Tailwind CSS

Database: PostgreSQL (Hosted on Supabase)

File Storage: Supabase Storage (S3 Compatible via Laravel Flysystem)

2. DATABASE SCHEMA (ERD & MIGRATIONS)
   AI Agent must create migrations for the following tables in the exact order to respect Foreign Key constraints:

users (Managed by Jetstream: id, name, email, password, profile_photo_path)

Additions: role (enum: 'admin', 'penyewa', 'pemilik', 'pengantar'), no_telp (string).

penyewa (id, user_id [FK], nik, no_darurat, foto_diri, status_verifikasi [boolean]).

pengantar_mobil (id, user_id [FK], status_ketersediaan [boolean]).

kendaraan (id, plat_nomor, merk, harga_sewa_per_jam [decimal], status [enum: Tersedia, Disewa, Maintenance], jarak_tempuh [integer]).

galeri_kendaraan (id, kendaraan_id [FK], url_foto, kategori_foto, is_utama [boolean]).

layanan_tambahan (id, nama_layanan, harga [decimal]).

pemesanan (id, penyewa_id [FK], kendaraan_id [FK], pengantar_id [FK nullable], tgl_sewa [datetime], tgl_kembali_rencana [datetime], tgl_kembali_aktual [datetime nullable], lokasi_antar [text], status_pesanan [enum: Pending, Aktif, Selesai, Batal], total_biaya [decimal], denda_keterlambatan [decimal nullable]).

pesanan_layanan (pemesanan_id [FK], layanan_id [FK], harga_saat_dipesan [decimal]). Note: Pivot table.

pembayaran (id, pemesanan_id [FK], jenis_bayar [enum: DP, Pelunasan, Denda], metode_bayar, nominal [decimal], bukti_transfer [text], status_bayar [enum: Menunggu, Tervalidasi, Gagal], tgl_bayar [datetime]).

log_gps (id, kendaraan_id [FK], lintang_lat [double], bujur_long [double], waktu_log [datetime]).

3. CORE BUSINESS LOGIC (CONTROLLERS & SERVICES)
   AI Agent must implement the following business rules inside Laravel Services/Controllers:

PemesananService:

calculateTotalCost(start_date, end_date, price_per_hour, add_ons_total)

calculateDP(total_cost) -> Must strictly return 25% of total cost.

calculateLateFee(planned_return, actual_return) -> Must calculate Rp 15.000 to Rp 20.000 per hour of delay.

KendaraanService:

checkMaintenanceStatus(current_km) -> If current_km multiple of 3000, update status to 'Maintenance'.

FileUploadService:

All file uploads (Foto Diri, Bukti Transfer, Galeri Kendaraan) must use Laravel Storage facade configured to s3 (Supabase Storage). Store the public URL in the database.

4. ROUTING & ENDPOINTS (INERTIA WEB)
   AI Agent must set up routes/web.php grouped by middleware (auth:sanctum, verified, and custom role middleware).

Public Routes:

GET / -> HomeController@index (Renders Home/Index.jsx)

GET /katalog -> CatalogController@index (Renders Catalog/Index.jsx)

GET /kendaraan/{id} -> CatalogController@show (Renders Catalog/Show.jsx)

Protected Routes (Renter/Penyewa):

POST /checkout -> BookingController@store

GET /dashboard/riwayat -> DashboardController@riwayat

POST /pembayaran/upload -> PaymentController@uploadBukti

Admin Routes (Prefix: /admin):

GET /dashboard -> AdminDashboardController@index

RESOURCE /kendaraan -> AdminVehicleController

POST /kendaraan/{id}/galeri -> AdminGalleryController@store

PUT /pemesanan/{id}/verifikasi -> AdminBookingController@verifyPayment

5. FRONTEND STRUCTURE (REACT + INERTIA)
   AI Agent must construct the UI inside resources/js/Pages/ and resources/js/Components/.

Layouts: AppLayout.jsx (Public/Renter), AdminLayout.jsx (Admin Dashboard).

Components:

VehicleCard.jsx (Displays main thumbnail, name, price).

ImageCarousel.jsx (For vehicle details).

StatusBadge.jsx (Tailwind colored badges for Pending/Aktif/Selesai).

Pages:

Home/Index.jsx (Hero section, search bar).

Catalog/Index.jsx (Grid list, filters).

Catalog/Show.jsx (Vehicle details, Add-ons selector).

Checkout/Index.jsx (Summary, DP calculation, Upload Transfer form).

6. AI AGENT EXECUTION PROMPTS (PHASED APPROACH)
   User: Feed these prompts sequentially to your AI Agent to build the system.

Phase 1: Setup & Env

"Initialize a new Laravel project with Jetstream (React/Inertia). Set up the .env file to connect to a PostgreSQL database and configure the s3 disk for Supabase Storage."

Phase 2: Database & Models

"Read the Database Schema section in the Blueprint. Generate all migrations, Eloquent Models, and define the relationships (hasMany, belongsTo, belongsToMany) for the Vehicle Rental System."

Phase 3: Core Logic & Controllers

"Generate the Controllers and Services defined in the Core Business Logic and Routing sections of the Blueprint. Implement the calculation logic for DP (25%) and late fees."

Phase 4: Frontend Scaffolding

"Build the React components and Pages defined in the Frontend Structure section using Tailwind CSS. Scaffold the Home, Catalog, and Detail views. Ensure Inertia Links are used for navigation."

Phase 5: Integration & File Upload

"Implement the form submission for the Checkout page. Ensure the file upload functionality for transfer receipts uses the configured S3 disk and saves the URL to the database."
