# Phase 1: Setup & Environment - Completion Guide

## Completed Tasks ✅

### 1. **Laravel Project with Jetstream (React/Inertia)**
   - ✅ Updated `package.json` with React and Inertia.js React dependencies
   - ✅ Updated `vite.config.js` to use `@vitejs/plugin-react`
   - ✅ Migrated `resources/js/app.js` to React with Inertia setup
   - ✅ Installed npm dependencies: `npm install`

### 2. **Environment Configuration**
   - ✅ Updated `.env` for PostgreSQL database connection
   - ✅ Updated `.env.example` template with PostgreSQL and S3 defaults
   - ✅ Configured `.env` to use S3 as default file storage

### 3. **Storage Configuration**
   - ✅ S3 disk configured in `config/filesystems.php` (already present)
   - ✅ Environment variables for S3/AWS set up

---

## Next Steps for Full Setup 🔧

### Step 1: PostgreSQL Database Setup

#### Option A: Local PostgreSQL Installation
1. Install PostgreSQL (if not already installed)
2. Create a new database:
   ```sql
   CREATE DATABASE penyewaan_kendaraan;
   ```
3. Create a PostgreSQL user:
   ```sql
   CREATE USER postgres WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE penyewaan_kendaraan TO postgres;
   ```
4. Update `.env` with your database credentials:
   ```
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=your_password
   ```

#### Option B: Supabase (Recommended)
1. Go to https://supabase.com and create a project
2. Copy the database credentials from Supabase dashboard
3. Update `.env`:
   ```
   DB_HOST=your-supabase-host.supabase.co
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=your_supabase_password
   DB_DATABASE=postgres
   ```

---

### Step 2: Supabase Storage Setup (for File Uploads)

1. In your Supabase project, go to **Storage**
2. Create a new bucket (e.g., `vehicles-rentals`)
3. Configure public access if needed
4. Create an API token from **Project Settings > API**
5. Update `.env` with Supabase credentials:
   ```
   AWS_ACCESS_KEY_ID=your_supabase_key
   AWS_SECRET_ACCESS_KEY=your_supabase_secret
   AWS_DEFAULT_REGION=your_region
   AWS_BUCKET=your_bucket_name
   AWS_ENDPOINT=https://your-project-id.supabase.co/storage/v1/s3
   AWS_USE_PATH_STYLE_ENDPOINT=true
   ```

---

### Step 3: Generate Application Key

If not already done, generate the Laravel application key:
```bash
php artisan key:generate
```

---

### Step 4: Test the Setup

1. **Start the development server:**
   ```bash
   php artisan serve
   ```

2. **In another terminal, start Vite dev server:**
   ```bash
   npm run dev
   ```

3. **Visit:** http://localhost:8000

---

## Files Modified in Phase 1 📝

- ✅ `package.json` - React and Inertia dependencies
- ✅ `vite.config.js` - React plugin configuration
- ✅ `resources/js/app.js` - React with Inertia setup
- ✅ `.env` - PostgreSQL and S3 configuration
- ✅ `.env.example` - Updated template

---

## Key Environment Variables 🔐

```
# Database (PostgreSQL)
DB_CONNECTION=pgsql
DB_HOST=your_host
DB_PORT=5432
DB_DATABASE=penyewaan_kendaraan
DB_USERNAME=postgres
DB_PASSWORD=your_password

# Storage (Supabase S3)
FILESYSTEM_DISK=s3
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_ENDPOINT=your_endpoint
AWS_BUCKET=your_bucket
AWS_USE_PATH_STYLE_ENDPOINT=true
```

---

## Ready for Phase 2 🚀

Once database and storage are configured, you're ready to proceed with:
- **Phase 2:** Database migrations and Eloquent models
- **Phase 3:** Controllers and business logic services
- **Phase 4:** React component and page scaffolding
- **Phase 5:** File upload integration and checkout functionality

---

## Troubleshooting 🔍

### npm dependencies not installed?
```bash
npm install
```

### Database connection issues?
- Verify database is running
- Check DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD in `.env`
- Test connection: `php artisan migrate --dry-run`

### Storage/S3 issues?
- Verify Supabase bucket is public (if needed)
- Check AWS credentials in `.env`
- Verify endpoint format: `https://project-id.supabase.co/storage/v1/s3`

