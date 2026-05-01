<div>
    {{-- START: Navbar --}}
    {{-- <nav class="bg-white shadow-sm sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16 items-center">
                <div class="flex-shrink-0 font-bold text-xl text-primary">
                    Petahunan Rent
                </div>
                <div class="hidden md:flex space-x-8">
                    <a href="{{ route('home') }}" class="text-slate-500 hover:text-primary">Beranda</a>
                    <a href="#" class="text-primary font-medium border-b-2 border-primary">Katalog</a>
                    <a href="{{ route('terms') }}" class="text-slate-500 hover:text-primary">Syarat & Ketentuan</a>
                </div>
                <div class="flex space-x-4 items-center">
                    @auth
                    <div class="flex items-center gap-3">
                        <a href="{{ url('/dashboard') }}"
                            class="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-800 transition text-sm">
                            Dashboard
                        </a>
                        <form method="POST" action="{{ route('logout') }}" class="m-0 p-0">
                            @csrf
                            <button type="submit"
                                class="text-rose-600 border border-rose-200 bg-rose-50 px-4 py-2 rounded-lg font-medium hover:bg-rose-100 hover:text-rose-700 transition text-sm">
                                Keluar
                            </button>
                        </form>
                    </div>
                    @else
                    <a href="{{ route('login') }}" class="text-slate-600 hover:text-primary font-medium transition">
                        Masuk
                    </a>
                    <a href="{{ route('register') }}"
                        class="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primaryHover transition">
                        Daftar
                    </a>
                    @endauth
                </div>
            </div>
        </div>
    </nav>
    END: Navbar --}}

    {{-- START: Main Content --}}
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-slate-900 mb-2">
                Katalog Kendaraan
            </h1>
            <p class="text-slate-500">
                Pilih kendaraan terbaik untuk perjalanan Anda di Banyumas dan sekitarnya.
            </p>

            <div
                class="mt-4 bg-slate-200 w-full h-32 rounded-xl flex items-center justify-center border border-slate-300 relative overflow-hidden">
                <span class="text-slate-500 font-medium z-10 bg-white/80 px-4 py-1 rounded shadow-sm">Integrasi Google
                    Maps Area Petahunan (Placeholder)</span>
            </div>
        </div>

        <div class="flex flex-col lg:flex-row gap-8">
            <aside class="w-full lg:w-1/4">
                <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-100 sticky top-24">
                    <h2 class="font-semibold text-lg mb-4">Filter Pencarian</h2>

                    <div class="mb-6">
                        <label class="block text-sm font-medium text-slate-700 mb-2">Jenis Kendaraan</label>
                        <div class="space-y-2">
                            <label class="flex items-center">
                                <input type="checkbox" class="rounded text-primary focus:ring-primary" checked />
                                <span class="ml-2 text-slate-600">MPV (Keluarga)</span>
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" class="rounded text-primary focus:ring-primary" />
                                <span class="ml-2 text-slate-600">SUV (Tangguh)</span>
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" class="rounded text-primary focus:ring-primary" />
                                <span class="ml-2 text-slate-600">City Car</span>
                            </label>
                        </div>
                    </div>

                    <div class="mb-6">
                        <label class="block text-sm font-medium text-slate-700 mb-2">Harga / Hari</label>
                        <select
                            class="w-full border-slate-300 rounded-lg shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 p-2 border">
                            <option>Semua Harga</option>
                            <option>
                                < Rp 300.000</option>
                            <option>Rp 300.000 - Rp 500.000</option>
                            <option>> Rp 500.000</option>
                        </select>
                    </div>

                    <div class="mb-6">
                        <label class="block text-sm font-medium text-slate-700 mb-2">Transmisi</label>
                        <div class="flex gap-2">
                            <button
                                class="flex-1 py-2 border border-primary bg-primary/10 text-primary rounded-lg font-medium text-sm">
                                Manual
                            </button>
                            <button
                                class="flex-1 py-2 border border-slate-200 text-slate-600 rounded-lg font-medium text-sm hover:bg-slate-50">
                                Matic
                            </button>
                        </div>
                    </div>

                    <button
                        class="w-full bg-slate-900 text-white py-2 rounded-lg font-medium hover:bg-slate-800 transition">
                        Terapkan Filter
                    </button>
                </div>
            </aside>
            <div class="w-full lg:w-3/4">
                <div id="catalog-grid" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                    {{-- Looping Data dari Database MySQL --}}
                    @foreach($kendaraans as $vehicle)
                        <div
                            class="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col transition hover:shadow-md">

                            {{-- Gambar (Sementara pakai placeholder acak karena belum ada kolom foto di DB) --}}
                            <div class="relative h-48 bg-slate-200">
                                {{-- Cek apakah mobil memiliki foto utama --}}
                                @if($vehicle->fotoUtama)
                                    <img src="{{ asset('storage/' . $vehicle->fotoUtama->path_foto) }}"
                                        alt="{{ $vehicle->merk }}" class="w-full h-full object-cover">
                                @else
                                    {{-- Tampilkan gambar default jika admin belum upload foto --}}
                                    <div
                                        class="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400">
                                        <svg class="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span class="text-xs font-medium">Foto Belum Tersedia</span>
                                    </div>
                                @endif

                                <div class="absolute top-3 right-3">
                                    @if($vehicle->status === 'Tersedia')
                                        <span
                                            class="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-md shadow-sm uppercase">Tersedia</span>
                                    @else
                                        <span
                                            class="bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-1 rounded-md shadow-sm uppercase">Disewa</span>
                                    @endif
                                </div>
                            </div>

                            <div class="p-5 flex flex-col flex-grow">
                                <div class="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 class="text-lg font-bold text-slate-900">{{ $vehicle->merk }}</h3>
                                        <p class="text-sm text-slate-500">{{ $vehicle->jenis }} • Plat:
                                            {{ $vehicle->plat_nomor }}
                                        </p>
                                    </div>

                                    {{-- Rating Statis Dulu (Belum buat seeder ulasan) --}}
                                    <div class="flex items-center bg-amber-50 px-2 py-1 rounded text-sm">
                                        <span class="text-amber-500 mr-1">★</span>
                                        <span class="font-semibold text-slate-700">0.0</span>
                                    </div>
                                </div>

                                <div class="mt-4 mb-6">
                                    {{-- Format Rupiah dengan PHP bawaan --}}
                                    <span class="text-xl font-bold text-slate-900">Rp
                                        {{ number_format($vehicle->harga_sewa_per_hari, 0, ',', '.') }}</span>
                                    <span class="text-sm text-slate-500">/ hari</span>
                                </div>

                                <div class="mt-auto">
                                    @if($vehicle->status === 'Tersedia')
                                        <a href="{{ route('catalog.detail', $vehicle->id) }}"
                                            class="w-full py-2 rounded-lg font-medium transition bg-primary hover:bg-primaryHover text-white cursor-pointer block text-center">
                                            Pilih Mobil
                                        </a>
                                    @else
                                        <button
                                            class="w-full py-2 rounded-lg font-medium transition bg-slate-200 text-slate-400 cursor-not-allowed"
                                            disabled>
                                            Sedang Disewa
                                        </button>
                                    @endif
                                </div>
                            </div>
                        </div>
                    @endforeach

                </div>
            </div>
        </div>
    </main>
    {{-- END: Main Content --}}

    {{-- Script Sementara untuk Data Dummy --}}

</div>

{{-- @push('scripts')
<script>
    const vehicles = [
        { id: 1, name: "Toyota Avanza Veloz", type: "MPV", transmission: "Manual", pricePerDay: 350000, rating: 4.8, reviews: 24, status: "Tersedia", imageUrl: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=400" },
        { id: 2, name: "Mitsubishi Xpander", type: "MPV", transmission: "Matic", pricePerDay: 400000, rating: 4.9, reviews: 18, status: "Tersedia", imageUrl: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=400" },
        { id: 3, name: "Honda Brio Satya", type: "City Car", transmission: "Manual", pricePerDay: 250000, rating: 4.7, reviews: 32, status: "Disewa", imageUrl: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=400" },
        { id: 4, name: "Toyota Fortuner VRZ", type: "SUV", transmission: "Matic", pricePerDay: 800000, rating: 5.0, reviews: 12, status: "Tersedia", imageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=400" }
    ];

    function formatRupiah(number) {
        return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(number);
    }

    function renderCatalog() {
        const grid = document.getElementById("catalog-grid");
        if (!grid) return;
        grid.innerHTML = "";

        vehicles.forEach((vehicle) => {
            const statusBadge = vehicle.status === "Tersedia"
                ? `<span class="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-1 rounded-md">Tersedia</span>`
                : `<span class="bg-rose-100 text-rose-700 text-xs font-semibold px-2 py-1 rounded-md">Disewa</span>`;

            const btnClass = vehicle.status === "Tersedia"
                ? `bg-primary hover:bg-primaryHover text-white cursor-pointer`
                : `bg-slate-200 text-slate-400 cursor-not-allowed`;

            const btnText = vehicle.status === "Tersedia" ? "Lihat Detail" : "Tidak Tersedia";

            const cardHTML = `
                                <div class="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col transition hover:shadow-md">
                                    <div class="relative h-48 bg-slate-200">
                                        <img src="${vehicle.imageUrl}" alt="${vehicle.name}" class="w-full h-full object-cover">
                                        <div class="absolute top-3 right-3">${statusBadge}</div>
                                    </div>
                                    <div class="p-5 flex flex-col flex-grow">
                                        <div class="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 class="text-lg font-bold text-slate-900">${vehicle.name}</h3>
                                                <p class="text-sm text-slate-500">${vehicle.type} • ${vehicle.transmission}</p>
                                            </div>
                                            <div class="flex items-center bg-amber-50 px-2 py-1 rounded text-sm">
                                                <span class="text-amber-500 mr-1">★</span>
                                                <span class="font-semibold text-slate-700">${vehicle.rating}</span>
                                            </div>
                                        </div>
                                        <div class="mt-4 mb-6">
                                            <span class="text-xl font-bold text-slate-900">${formatRupiah(vehicle.pricePerDay)}</span>
                                            <span class="text-sm text-slate-500">/ hari</span>
                                        </div>
                                        <div class="mt-auto">
                                            <button class="w-full py-2 rounded-lg font-medium transition ${btnClass}">${btnText}</button>
                                        </div>
                                    </div>
                                </div>
                            `;
            grid.innerHTML += cardHTML;
        });
    }
    document.addEventListener("DOMContentLoaded", renderCatalog);
</script>
@endpush --}}