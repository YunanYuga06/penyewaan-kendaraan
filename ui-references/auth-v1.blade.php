<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Masuk / Daftar | Petahunan Rent Car</title>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet">

    <!-- Tailwind CSS via CDN -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Tailwind Config -->
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: { sans: ['Inter', 'sans-serif'] },
                    colors: {
                        primary: '#2563eb',
                        primaryHover: '#1d4ed8',
                    }
                }
            }
        }
    </script>
</head>

<body class="bg-white text-slate-800 font-sans h-screen overflow-hidden flex">

    <!-- START: Left Panel (Branding / Image) -->
    <div class="hidden lg:flex lg:w-1/2 relative bg-slate-900 items-center justify-center">
        <div class="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1000"
                alt="Petahunan Rent Car" class="w-full h-full object-cover opacity-40">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        </div>

        <div class="relative z-10 p-12 max-w-lg text-white">
            <div class="font-extrabold text-3xl tracking-tight mb-8">
                Petahunan<span class="text-primary">Rent</span>
            </div>
            <h1 class="text-4xl font-bold mb-4 leading-tight">Perjalanan yang Nyaman Dimulai dari Sini.</h1>
            <p class="text-slate-300 text-lg mb-8 leading-relaxed">Bergabunglah dengan kami untuk menikmati kemudahan
                sewa mobil 24 jam dengan kalkulasi harga yang transparan dan armada yang selalu terawat.</p>

            <div
                class="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 inline-flex">
                <svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z">
                    </path>
                </svg>
                <span class="font-medium text-sm">Data Anda dilindungi dengan enkripsi aman.</span>
            </div>
        </div>
    </div>

    <!-- START: Right Panel (Forms) -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 overflow-y-auto">
        <div class="w-full max-w-md">

            <div class="lg:hidden font-extrabold text-2xl tracking-tight mb-8 text-center">
                Petahunan<span class="text-primary">Rent</span>
            </div>

            <!-- TAMPILAN ERROR VALIDASI LARAVEL -->
            @if ($errors->any())
                <div class="mb-4 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-sm">
                    <ul class="list-disc list-inside">
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <!-- FORM LOGIN -->
            <div id="login-section"
                class="{{ old('form_type') == 'register' ? 'hidden' : 'block' }} transition-all duration-300">
                <h2 class="text-3xl font-bold text-slate-900 mb-2">Selamat Datang Kembali</h2>
                <p class="text-slate-500 mb-8">Silakan masuk ke akun Anda untuk mengelola penyewaan.</p>

                <form method="POST" action="{{ route('login') }}" class="space-y-5">
                    @csrf
                    <input type="hidden" name="form_type" value="login">
                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-1">Email</label>
                        <input type="email" name="email" value="{{ old('email') }}" required
                            class="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-slate-50 focus:bg-white"
                            placeholder="nama@email.com">
                    </div>
                    <div>
                        <div class="flex justify-between items-center mb-1">
                            <label class="block text-sm font-semibold text-slate-700">Password</label>
                            @if (Route::has('password.request'))
                                <a href="{{ route('password.request') }}"
                                    class="text-sm font-semibold text-primary hover:text-primaryHover">Lupa Password?</a>
                            @endif
                        </div>
                        <input type="password" name="password" required
                            class="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-slate-50 focus:bg-white"
                            placeholder="••••••••">
                    </div>

                    <button type="submit"
                        class="w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-primaryHover transition shadow-md shadow-primary/30 mt-4">
                        Masuk
                    </button>
                </form>

                <div class="mt-8 text-center text-slate-600">
                    Belum punya akun?
                    <button onclick="toggleForm('register')"
                        class="font-bold text-primary hover:text-primaryHover ml-1 focus:outline-none">Daftar
                        Sekarang</button>
                </div>
            </div>

            <!-- FORM REGISTER -->
            <div id="register-section"
                class="{{ old('form_type') == 'register' ? 'block' : 'hidden' }} transition-all duration-300">
                <h2 class="text-3xl font-bold text-slate-900 mb-2">Buat Akun Baru</h2>
                <p class="text-slate-500 mb-8">Lengkapi data diri Anda untuk mulai menyewa kendaraan.</p>

                <form method="POST" action="{{ route('register') }}" class="space-y-4">
                    @csrf
                    <input type="hidden" name="form_type" value="register">
                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-1">Nama Lengkap</label>
                        <input type="text" name="name" value="{{ old('name') }}" required
                            class="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-slate-50 focus:bg-white"
                            placeholder="Sesuai KTP">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-1">Nomor Telepon / WA</label>
                        <input type="tel" name="no_telepon" value="{{ old('no_telepon') }}" required
                            class="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-slate-50 focus:bg-white"
                            placeholder="08123456789">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-1">Email</label>
                        <input type="email" name="email" value="{{ old('email') }}" required
                            class="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-slate-50 focus:bg-white"
                            placeholder="nama@email.com">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-1">Password</label>
                        <input type="password" name="password" required
                            class="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-slate-50 focus:bg-white"
                            placeholder="Minimal 8 karakter">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-1">Konfirmasi Password</label>
                        <input type="password" name="password_confirmation" required
                            class="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-slate-50 focus:bg-white"
                            placeholder="Ulangi password">
                    </div>

                    <button type="submit"
                        class="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-slate-800 transition shadow-md mt-6">
                        Buat Akun
                    </button>
                </form>

                <div class="mt-8 text-center text-slate-600">
                    Sudah punya akun?
                    <button onclick="toggleForm('login')"
                        class="font-bold text-primary hover:text-primaryHover ml-1 focus:outline-none">Masuk di
                        sini</button>
                </div>
            </div>

        </div>
    </div>

    <script>
        const loginSection = document.getElementById('login-section');
        const registerSection = document.getElementById('register-section');

        function toggleForm(target) {
            if (target === 'register') {
                loginSection.classList.add('hidden');
                loginSection.classList.remove('block');
                registerSection.classList.remove('hidden');
                registerSection.classList.add('block');
            } else {
                registerSection.classList.add('hidden');
                registerSection.classList.remove('block');
                loginSection.classList.remove('hidden');
                loginSection.classList.add('block');
            }
        }
    </script>
</body>

</html>