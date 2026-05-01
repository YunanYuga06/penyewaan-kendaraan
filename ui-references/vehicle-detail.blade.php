<div class="bg-slate-50 min-h-screen py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {{-- BREADCRUMB --}}
        <nav class="mb-6 text-sm text-slate-500 font-medium">
            <a href="{{ route('home') }}" class="hover:text-primary">Beranda</a>
            <span class="mx-2">/</span>
            <a href="{{ route('catalog') }}" class="hover:text-primary">Katalog</a>
            <span class="mx-2">/</span>
            <span class="text-slate-800">{{ $vehicle->merk }}</span>
        </nav>

        {{-- KONTEN UTAMA DENGAN CARD PUTIH BERSATU --}}
        <div
            class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col lg:flex-row p-6 md:p-8 gap-8 lg:gap-12">

            {{-- KOLOM KIRI: GALERI GAMBAR --}}
            <div class="w-full lg:w-1/2 flex flex-col">
                {{-- Gambar Utama --}}
                <div
                    class="w-full aspect-[4/3] bg-slate-100 rounded-xl overflow-hidden relative mb-4 border border-slate-200">
                    {{-- Badge Kategori --}}
                    <div class="absolute top-4 left-4 z-10">
                        <span
                            class="bg-primary/90 backdrop-blur text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-sm">
                            {{ $vehicle->jenis }}
                        </span>
                    </div>

                    @if($activeImage)
                        <img src="{{ asset('storage/' . $activeImage) }}" alt="{{ $vehicle->merk }}"
                            class="w-full h-full object-cover transition-all duration-300">
                    @else
                        <div class="w-full h-full flex items-center justify-center text-slate-400">Tidak ada foto</div>
                    @endif
                </div>

                {{-- Thumbnail Galeri --}}
                @if($vehicle->galeri->count() > 0)
                    <div class="grid grid-cols-4 sm:grid-cols-5 gap-3">
                        @foreach($vehicle->galeri as $foto)
                            <button wire:click="changeImage('{{ $foto->path_foto }}')"
                                class="relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all {{ $activeImage === $foto->path_foto ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-slate-300' }}">
                                <img src="{{ asset('storage/' . $foto->path_foto) }}" class="w-full h-full object-cover">
                                @if($activeImage !== $foto->path_foto)
                                    <div class="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors"></div>
                                @endif
                            </button>
                        @endforeach
                    </div>
                @endif
            </div>

            {{-- KOLOM KANAN: INFO & FORM BOOKING --}}
            <div class="w-full lg:w-1/2">
                {{-- Info Kendaraan --}}
                <div class="mb-6">
                    <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">{{ $vehicle->merk }}</h1>

                    {{-- Baris Ikon Spesifikasi --}}
                    <div class="flex flex-wrap gap-4 mt-3 text-sm font-medium text-slate-600">
                        <span class="flex items-center gap-1.5">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4">
                                </path>
                            </svg>
                            Manual / AT
                        </span>
                        <span class="flex items-center gap-1.5">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                                </path>
                            </svg>
                            2022+
                        </span>
                        <span class="flex items-center gap-1.5">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                            Bensin
                        </span>
                        <span class="flex items-center gap-1.5">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
                                </path>
                            </svg>
                            {{ $vehicle->jenis === 'MPV' ? '7 Kursi' : '5 Kursi' }}
                        </span>
                    </div>

                    {{-- Harga Info --}}
                    <div class="mt-4 flex items-center gap-3">
                        {{-- Harga Coret (Simulasi diskon 15%) --}}
                        <span class="line-through text-slate-400 text-lg font-medium">
                            Rp {{ number_format($vehicle->harga_sewa_per_hari * 1.15, 0, ',', '.') }}
                        </span>
                        <span class="text-3xl font-extrabold text-slate-900">
                            Rp {{ number_format($vehicle->harga_sewa_per_hari, 0, ',', '.') }}
                        </span>
                        <span class="border border-slate-300 text-slate-500 text-xs px-2 py-1 rounded-md font-semibold">
                            / Hari
                        </span>
                    </div>
                    <p class="text-xs text-slate-500 mt-2">Harga spesial untuk area eks-Karesidenan Banyumas. Booking
                        sekarang via WhatsApp untuk memastikan ketersediaan unit!</p>
                </div>

                {{-- FORM BOOKING --}}
                <form wire:submit.prevent="bookViaWhatsapp" class="space-y-4">

                    {{-- Row 1: Durasi & Tanggal --}}
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">Durasi (Hari)</label>
                            <div class="flex items-center">
                                <button type="button" wire:click="decrementDurasi"
                                    class="bg-slate-100 border border-slate-300 text-slate-600 px-3 py-2.5 rounded-l-lg hover:bg-slate-200 transition font-bold">-</button>
                                <input type="text" wire:model="durasi"
                                    class="w-full text-center border-y border-slate-300 bg-white py-2.5 text-sm font-bold focus:outline-none"
                                    readonly>
                                <button type="button" wire:click="incrementDurasi"
                                    class="bg-primary border border-primary text-white px-3 py-2.5 rounded-r-lg hover:bg-primaryDark transition font-bold">+</button>
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">Tanggal Sewa <span
                                    class="text-rose-500">*</span></label>
                            <input type="date" wire:model="tanggal_sewa" required
                                class="w-full border-slate-300 rounded-lg p-2.5 text-sm shadow-sm focus:border-primary focus:ring focus:ring-primary/50">
                            @error('tanggal_sewa') <span class="text-rose-500 text-xs">{{ $message }}</span> @enderror
                        </div>
                    </div>

                    {{-- Row 2: Nama Penyewa --}}
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">Nama Penyewa <span
                                class="text-rose-500">*</span></label>
                        <input type="text" wire:model="nama_penyewa" required placeholder="Masukkan nama penyewa"
                            class="w-full border-slate-300 rounded-lg p-2.5 text-sm shadow-sm focus:border-primary focus:ring focus:ring-primary/50">
                        @error('nama_penyewa') <span class="text-rose-500 text-xs">{{ $message }}</span> @enderror
                    </div>

                    {{-- Row 3: Lokasi Penjemputan --}}
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">Lokasi Penjemputan <span
                                class="text-rose-500">*</span></label>
                        <input type="text" wire:model="lokasi_penjemputan" required
                            placeholder="Contoh: Stasiun Purwokerto"
                            class="w-full border-slate-300 rounded-lg p-2.5 text-sm shadow-sm focus:border-primary focus:ring focus:ring-primary/50">
                        @error('lokasi_penjemputan') <span class="text-rose-500 text-xs">{{ $message }}</span> @enderror
                    </div>

                    {{-- Row 4: Trip Tujuan --}}
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">Trip Tujuan <span
                                class="text-rose-500">*</span></label>
                        <input type="text" wire:model="trip_tujuan" required
                            placeholder="Contoh: Purwokerto - Baturraden"
                            class="w-full border-slate-300 rounded-lg p-2.5 text-sm shadow-sm focus:border-primary focus:ring focus:ring-primary/50">
                        @error('trip_tujuan') <span class="text-rose-500 text-xs">{{ $message }}</span> @enderror
                    </div>

                    {{-- Row 5: Jam Jemput --}}
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">Jam Penjemputan <span
                                class="text-rose-500">*</span></label>
                        <input type="time" wire:model="jam_jemput" required
                            class="w-full border-slate-300 rounded-lg p-2.5 text-sm shadow-sm focus:border-primary focus:ring focus:ring-primary/50">
                        @error('jam_jemput') <span class="text-rose-500 text-xs">{{ $message }}</span> @enderror
                    </div>

                    {{-- Tombol Booking WA --}}
                    <div class="pt-4 mt-2 border-t border-slate-100 flex gap-3">

                        {{-- Tombol Booking Web (Biru) --}}
                        <button type="button" wire:click="redirectToBooking"
                            class="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primaryDark text-white py-3.5 rounded-xl font-bold text-sm transition-colors shadow-sm">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                                </path>
                            </svg>
                            Booking Sekarang
                        </button>

                        {{-- Tombol Tanya WA (Hijau) --}}
                        <button type="button" wire:click="askViaWhatsapp"
                            class="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white py-3.5 rounded-xl font-bold text-sm transition-colors shadow-sm">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Tanya lewat WA
                        </button>

                    </div>

                </form>
            </div>

        </div>
    </div>
</div>