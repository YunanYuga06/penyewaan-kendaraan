# Phase 2: Database & Models - Completion Guide

## ✅ Completed Tasks

### 1. **Database Migrations Created** (All 10 tables)

- ✅ `2026_05_01_154449_create_penyewa_table.php` - Renter profile management
- ✅ `2026_05_01_154450_create_pengantar_mobil_table.php` - Driver availability tracking
- ✅ `2026_05_01_154451_create_kendaraan_table.php` - Vehicle catalog
- ✅ `2026_05_01_154452_create_galeri_kendaraan_table.php` - Vehicle photo galleries
- ✅ `2026_05_01_154453_create_layanan_tambahan_table.php` - Additional services
- ✅ `2026_05_01_154454_create_pemesanan_table.php` - Booking system
- ✅ `2026_05_01_154455_create_pesanan_layanan_table.php` - Booking services (pivot)
- ✅ `2026_05_01_154456_create_pembayaran_table.php` - Payment tracking
- ✅ `2026_05_01_154457_create_log_gps_table.php` - GPS location logging
- ✅ `2026_05_01_154528_add_role_and_no_telp_to_users_table.php` - User role & phone additions

### 2. **Eloquent Models Created** (All 9 models with relationships)

- ✅ `app/Models/Penyewa.php` - belongsTo User, hasMany Pemesanan
- ✅ `app/Models/PenantarMobil.php` - belongsTo User, hasMany Pemesanan
- ✅ `app/Models/Kendaraan.php` - hasMany GaleriKendaraan, hasMany Pemesanan, hasMany LogGps
- ✅ `app/Models/GaleriKendaraan.php` - belongsTo Kendaraan
- ✅ `app/Models/LayananTambahan.php` - belongsToMany Pemesanan
- ✅ `app/Models/Pemesanan.php` - Full relationship setup (penyewa, kendaraan, pengantar, layanan, pembayaran)
- ✅ `app/Models/PesananLayanan.php` - Pivot model for many-to-many
- ✅ `app/Models/Pembayaran.php` - belongsTo Pemesanan
- ✅ `app/Models/LogGps.php` - belongsTo Kendaraan
- ✅ `app/Models/User.php` - Updated with role, no_telp, and relationships

### 3. **Model Relationships Configured**

- ✅ All foreign key constraints properly defined
- ✅ Cascade delete/set null logic implemented
- ✅ Fillable properties configured for mass assignment
- ✅ DateTime casting for date fields
- ✅ Composite primary key for PesananLayanan pivot table

---

## 🚨 Current Blocker: PostgreSQL Driver Missing

Your PHP environment has only MySQL (`pdo_mysql`) support. You need `pdo_pgsql` to connect to Supabase PostgreSQL.

### Option A: Quick Fix - Switch to MySQL Locally (Temporary)

For immediate testing, you can use MySQL for local development and Supabase for production:

```bash
# .env (for local development)
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=penyewaan_kendaraan
DB_USERNAME=root
DB_PASSWORD=
```

Then run migrations:

```bash
php artisan migrate
```

**⚠️ Note:** This is only for local development. You'll still need PostgreSQL driver for Supabase connection in production.

---

### Option B: Install PostgreSQL Extension (Recommended)

#### For Windows (with Laragon/XAMPP/WAMP):

1. **If using Laragon:**

    ```
    Laragon Menu → PHP → Extensions → Enable pgsql & pdo_pgsql
    ```

2. **If using XAMPP:**
    - Edit `php.ini` (usually `C:\xampp\php\php.ini`)
    - Uncomment these lines:
        ```
        extension=pdo_pgsql
        extension=pgsql
        ```
    - Restart Apache

3. **If using native PHP:**
    - Download PHP from https://windows.php.net
    - Choose the version with PostgreSQL support included
    - Update system PATH to new PHP directory
    - Verify: `php -m | findstr pdo_pgsql`

#### For Linux (Ubuntu/Debian):

```bash
# Install PHP PostgreSQL extension
sudo apt-get install php-pgsql php-pdo-pgsql

# Restart PHP-FPM or web server
sudo systemctl restart php-fpm
```

#### For macOS:

```bash
# Using Homebrew
brew install php-pgsql

# Or with Valet
valet install  # if using Laravel Valet
```

#### Verify Installation:

```bash
php -m | grep pdo_pgsql
php -i | grep "PostgreSQL"
```

---

### Option C: Use Docker (Clean Environment)

Docker setup with PostgreSQL:

```bash
# Create docker-compose.yml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: password
      POSTGRES_DB: penyewaan_kendaraan
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  app:
    build: .
    ports:
      - "8000:8000"
    environment:
      DB_HOST: postgres
      DB_DATABASE: penyewaan_kendaraan
      DB_USERNAME: postgres
      DB_PASSWORD: password
    depends_on:
      - postgres

volumes:
  postgres_data:
```

Then:

```bash
docker-compose up -d
docker-compose exec app php artisan migrate
```

---

## 📋 Schema Summary

### Foreign Key Relationships:

```
users (1) ──→ (many) penyewa
users (1) ──→ (many) pengantar_mobil
kendaraan (1) ──→ (many) galeri_kendaraan
kendaraan (1) ──→ (many) pemesanan
kendaraan (1) ──→ (many) log_gps
penyewa (1) ──→ (many) pemesanan
pengantar_mobil (1) ──→ (many) pemesanan (nullable)
layanan_tambahan (many) ──→ (many) pemesanan (via pesanan_layanan)
pemesanan (1) ──→ (many) pembayaran
```

### Enums:

- `users.role`: 'admin', 'penyewa', 'pemilik', 'pengantar'
- `kendaraan.status`: 'Tersedia', 'Disewa', 'Maintenance'
- `pemesanan.status_pesanan`: 'Pending', 'Aktif', 'Selesai', 'Batal'
- `pembayaran.jenis_bayar`: 'DP', 'Pelunasan', 'Denda'
- `pembayaran.status_bayar`: 'Menunggu', 'Tervalidasi', 'Gagal'

---

## 🔧 Running Migrations Once PostgreSQL is Ready

After installing the PostgreSQL driver:

```bash
# Test migration (dry-run)
php artisan migrate --dry-run

# Run actual migrations
php artisan migrate

# Verify tables created
php artisan migrate:status

# Rollback if needed
php artisan migrate:rollback
```

---

## 📝 Migration Order (Enforced)

All migrations respect foreign key dependencies:

1. `users` (existing, just adding columns)
2. `penyewa` → depends on users
3. `pengantar_mobil` → depends on users
4. `kendaraan` → independent
5. `galeri_kendaraan` → depends on kendaraan
6. `layanan_tambahan` → independent
7. `pemesanan` → depends on penyewa, kendaraan, pengantar_mobil
8. `pesanan_layanan` → depends on pemesanan, layanan_tambahan
9. `pembayaran` → depends on pemesanan
10. `log_gps` → depends on kendaraan

---

## ✨ Next Steps

### Immediate (After PostgreSQL Setup):

1. Install PostgreSQL PHP extension
2. Run: `php artisan migrate`
3. Verify all 10 tables exist in database

### For Phase 3 (Controllers & Services):

- Create Controllers: PemesananService, KendaraanService, FileUploadService
- Implement business logic for cost calculation, late fees, maintenance checks
- Set up API endpoints for bookings and payments

---

## 🎯 Model Usage Examples

Once migrations are run, you can use the models:

```php
// Create a penyewa (renter)
$user = User::create([
    'name' => 'John Doe',
    'email' => 'john@example.com',
    'password' => Hash::make('password'),
    'role' => 'penyewa',
    'no_telp' => '081234567890',
]);

$penyewa = Penyewa::create([
    'user_id' => $user->id,
    'nik' => '1234567890123456',
    'no_darurat' => '087654321098',
]);

// Create a vehicle
$kendaraan = Kendaraan::create([
    'plat_nomor' => 'H 1234 ABC',
    'merk' => 'Toyota Avanza',
    'harga_sewa_per_jam' => 50000,
    'status' => 'Tersedia',
]);

// Create a booking
$pemesanan = Pemesanan::create([
    'penyewa_id' => $penyewa->id,
    'kendaraan_id' => $kendaraan->id,
    'tgl_sewa' => now(),
    'tgl_kembali_rencana' => now()->addDays(1),
    'lokasi_antar' => 'Bandara',
    'total_biaya' => 1200000,
]);

// Access relationships
$pemesanan->penyewa->user->name;  // Get renter's name
$pemesanan->kendaraan->merk;      // Get vehicle brand
$pemesanan->layanan;              // Get attached services
```

---

## 📚 Files Created/Modified in Phase 2

### Migrations:

- `database/migrations/2026_05_01_154449_create_penyewa_table.php`
- `database/migrations/2026_05_01_154450_create_pengantar_mobil_table.php`
- `database/migrations/2026_05_01_154451_create_kendaraan_table.php`
- `database/migrations/2026_05_01_154452_create_galeri_kendaraan_table.php`
- `database/migrations/2026_05_01_154453_create_layanan_tambahan_table.php`
- `database/migrations/2026_05_01_154454_create_pemesanan_table.php`
- `database/migrations/2026_05_01_154455_create_pesanan_layanan_table.php`
- `database/migrations/2026_05_01_154456_create_pembayaran_table.php`
- `database/migrations/2026_05_01_154457_create_log_gps_table.php`
- `database/migrations/2026_05_01_154528_add_role_and_no_telp_to_users_table.php`

### Models:

- `app/Models/Penyewa.php`
- `app/Models/PenantarMobil.php`
- `app/Models/Kendaraan.php`
- `app/Models/GaleriKendaraan.php`
- `app/Models/LayananTambahan.php`
- `app/Models/Pemesanan.php`
- `app/Models/PesananLayanan.php`
- `app/Models/Pembayaran.php`
- `app/Models/LogGps.php`
- `app/Models/User.php` (updated)
