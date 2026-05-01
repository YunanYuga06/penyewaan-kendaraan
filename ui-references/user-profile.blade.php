<div class="bg-slate-50 min-h-screen py-8"> {{-- SINGLE ROOT ELEMENT --}}
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">
        
        {{-- KOLOM KIRI: SIDEBAR NAVIGASI --}}
        <div class="w-full md:w-1/4 shrink-0">
            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden sticky top-24">
                {{-- User Avatar & Name --}}
                <div class="p-6 border-b border-slate-100 flex items-center gap-4">
                    <div class="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl uppercase">
                        {{ substr($user->name, 0, 1) }}
                    </div>
                    <div>
                        <h3 class="font-bold text-slate-800">{{ $user->name }}</h3>
                        <p class="text-xs text-slate-500 capitalize">{{ $user->role ?? 'Penyewa' }}</p>
                    </div>
                </div>

                {{-- Menu Navigasi --}}
                <nav class="p-3 space-y-1">
                    <button wire:click="switchTab('info')" class="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors {{ $activeTab === 'info' ? 'bg-primary text-white shadow-md' : 'text-slate-600 hover:bg-slate-50' }}">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        Informasi Akun
                    </button>
                    <button wire:click="switchTab('bookings')" class="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors {{ $activeTab === 'bookings' ? 'bg-primary text-white shadow-md' : 'text-slate-600 hover:bg-slate-50' }}">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                        Pesanan Saya
                    </button>
                    <button wire:click="switchTab('history')" class="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors {{ $activeTab === 'history' ? 'bg-primary text-white shadow-md' : 'text-slate-600 hover:bg-slate-50' }}">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
                        Riwayat Sewa
                    </button>

                    <div class="pt-4 mt-2 border-t border-slate-100">
                        {{-- Tombol Logout --}}
                        <form method="POST" action="{{ route('logout') }}" class="block w-full">
                            @csrf
                            <button type="submit" class="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-rose-600 hover:bg-rose-50 transition-colors">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                                Keluar (Logout)
                            </button>
                        </form>
                    </div>
                </nav>
            </div>
        </div>

        {{-- KOLOM KANAN: KONTEN DINAMIS --}}
        <div class="w-full md:w-3/4">
            
            {{-- TAB 1: INFORMASI AKUN --}}
            @if($activeTab === 'info')
                <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                    <h2 class="text-xl font-bold text-slate-800 mb-6 border-b pb-4">Informasi Pribadi</h2>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-slate-500">Nama Lengkap</label>
                            <p class="mt-1 font-semibold text-slate-900">{{ $user->name }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-slate-500">Alamat Email</label>
                            <p class="mt-1 font-semibold text-slate-900">{{ $user->email }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-slate-500">Bergabung Sejak</label>
                            <p class="mt-1 font-semibold text-slate-900">{{ $user->created_at->format('d F Y') }}</p>
                        </div>
                        <div class="pt-4">
                            <button class="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-200 transition">Edit Profil</button>
                        </div>
                    </div>
                </div>
            @endif

            {{-- TAB 2: PESANAN SAYA (E-Commerce Style) --}}
            @if($activeTab === 'bookings')
                <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    {{-- Navigasi Status Pesanan --}}
                    <div class="flex border-b border-slate-200 bg-slate-50 overflow-x-auto hide-scrollbar">
                        <button wire:click="setBookingStatus('menunggu')" class="flex-1 py-4 px-6 text-sm font-bold text-center border-b-2 transition-colors {{ $bookingStatus === 'menunggu' ? 'border-primary text-primary bg-white' : 'border-transparent text-slate-500 hover:text-slate-700' }} whitespace-nowrap">
                            Menunggu Pembayaran
                        </button>
                        <button wire:click="setBookingStatus('dikonfirmasi')" class="flex-1 py-4 px-6 text-sm font-bold text-center border-b-2 transition-colors {{ $bookingStatus === 'dikonfirmasi' ? 'border-primary text-primary bg-white' : 'border-transparent text-slate-500 hover:text-slate-700' }} whitespace-nowrap">
                            Terkonfirmasi
                        </button>
                        <button wire:click="setBookingStatus('berjalan')" class="flex-1 py-4 px-6 text-sm font-bold text-center border-b-2 transition-colors {{ $bookingStatus === 'berjalan' ? 'border-primary text-primary bg-white' : 'border-transparent text-slate-500 hover:text-slate-700' }} whitespace-nowrap">
                            Sedang Disewa
                        </button>
                    </div>

                    {{-- Konten Pesanan (Dummy Design) --}}
                    <div class="p-8 text-center text-slate-500">
                        <svg class="w-16 h-16 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
                        <p class="font-medium text-slate-600">Belum ada pesanan di status ini.</p>
                        <p class="text-sm mt-1">Cari mobil impian Anda dan mulai perjalanan sekarang!</p>
                        <a href="#" class="inline-block mt-4 bg-primary text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-primaryDark transition">Eksplor Katalog</a>
                    </div>
                </div>
            @endif

            {{-- TAB 3: RIWAYAT SEWA --}}
            @if($activeTab === 'history')
                <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center text-slate-500">
                    <svg class="w-16 h-16 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <p class="font-medium text-slate-600">Belum ada riwayat perjalanan.</p>
                    <p class="text-sm mt-1">Pesanan yang sudah selesai atau dibatalkan akan muncul di sini.</p>
                </div>
            @endif

        </div>
    </div>
</div>