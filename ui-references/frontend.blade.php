<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title ?? 'Petahunan Rent Car | Sewa Mobil Banyumas' }}</title>

    {{-- Fonts --}}
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    {{-- Tailwind CDN --}}
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: { sans: ['Inter', 'sans-serif'] },
                    colors: {
                        primary: '#2563eb',
                        primaryDark: '#1e40af',
                    }
                }
            }
        }
    </script>
</head>

<body class="bg-slate-50 text-slate-800 font-sans flex flex-col min-h-screen">

    {{-- NAVBAR GLOBAL --}}
    <nav class="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16 items-center">

                {{-- Logo --}}
                <div class="flex-shrink-0 flex items-center">
                    <a href="{{ route('home') }}" class="text-2xl font-extrabold tracking-tight text-slate-800">
                        Petahunan <span class="text-primary">Rent</span>
                    </a>
                </div>

                {{-- Menu Navigasi (Desktop) --}}
                <div class="hidden md:flex space-x-8">
                    <a href="{{ route('home') }}"
                        class="inline-flex items-center px-1 pt-1 border-b-2 {{ request()->routeIs('home') ? 'border-primary text-primary font-semibold' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300' }} text-sm transition">
                        Beranda
                    </a>
                    <a href="#"
                        class="inline-flex items-center px-1 pt-1 border-b-2 {{ request()->routeIs('catalog') ? 'border-primary text-primary font-semibold' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300' }} text-sm transition">
                        Katalog
                    </a>
                    <a href="{{ route('terms') }}"
                        class="inline-flex items-center px-1 pt-1 border-b-2 {{ request()->routeIs('terms') ? 'border-primary text-primary font-semibold' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300' }} text-sm transition">
                        Syarat & Ketentuan
                    </a>
                    <a href="{{ route('about') }}"
                        class="inline-flex items-center px-1 pt-1 border-b-2 {{ request()->routeIs('about') ? 'border-primary text-primary font-semibold' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300' }} text-sm transition">
                        Tentang Kami
                    </a>
                </div>

                {{-- Tombol Login / Dashboard --}}
                <div class="flex items-center">
                    @auth
                        @if(Auth::user()->role === 'admin')
                            <a href="{{ route('admin') }}"
                                class="bg-slate-900 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition shadow-sm">Dashboard
                                Admin</a>
                        @else
                            {{-- Jika user biasa, arahkan ke halaman profil/booking mereka --}}
                            <a href="{{ route('profile.user') }}"
                                class="bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-primaryDark transition shadow-sm">Akun
                                Saya</a>
                        @endif
                    @else
                        <a href="{{ route('login') }}"
                            class="text-slate-600 hover:text-primary font-medium hidden sm:block transition">Masuk</a>
                        <a href="{{ route('register') }}"
                            class="bg-primary text-white px-5 py-2.5 rounded-lg font-medium hover:bg-primaryHover transition shadow-md hover:shadow-lg">
                            Daftar Akun
                        </a>
                    @endauth
                </div>

            </div>
        </div>
    </nav>

    {{-- KONTEN UTAMA (DI SINI HALAMAN ABOUT & TERMS AKAN MUNCUL) --}}
    <main class="flex-grow">
        {{ $slot }}
    </main>

    {{-- FOOTER GLOBAL --}}
    <footer class="bg-slate-900 text-slate-300 border-t border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <span class="text-2xl font-extrabold tracking-tight text-white mb-4 block">
                        Petahunan <span class="text-primary">Rent</span>
                    </span>
                    <p class="text-sm text-slate-400">
                        Solusi sewa mobil tepercaya di Banyumas dan sekitarnya. Perjalanan aman, nyaman, dan harga
                        transparan.
                    </p>
                </div>
                <div>
                    <h3 class="text-sm font-bold text-white tracking-wider uppercase mb-4">Tautan Cepat</h3>
                    <ul class="space-y-2 text-sm">
                        <li><a href="{{ route('home') }}" class="hover:text-primary transition">Beranda</a></li>
                        <li><a href="{{ route('catalog') }}" class="hover:text-primary transition">Katalog Kendaraan</a>
                        </li>
                        <li><a href="{{ route('terms') }}" class="hover:text-primary transition">Syarat & Ketentuan</a>
                        </li>
                        <li><a href="{{ route('about') }}" class="hover:text-primary transition">Tentang Kami</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-sm font-bold text-white tracking-wider uppercase mb-4">Kontak</h3>
                    <ul class="space-y-2 text-sm text-slate-400">
                        <li>📍 Jl. Raya Baturraden, Banyumas, Jawa Tengah</li>
                        <li>📞 +62 812-XXXX-XXXX</li>
                        <li>✉️ info@petahunanrent.com</li>
                    </ul>
                </div>
            </div>
            <div class="mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
                &copy; {{ date('Y') }} Petahunan Rent Car. Hak Cipta Dilindungi.
            </div>
        </div>
    </footer>

    @livewireScripts
</body>

</html>