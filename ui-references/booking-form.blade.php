<div class="bg-slate-50 min-h-screen py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight mb-8">Selesaikan Pesanan Anda</h1>

        <div class="flex flex-col lg:flex-row gap-8">

            {{-- KOLOM KIRI: FORMULIR PEMESANAN --}}
            <div class="w-full lg:w-2/3 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
                <h2 class="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4 mb-6">Detail Perjalanan</h2>

                <form class="space-y-5">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">Nama Penyewa</label>
                            <input type="text" wire:model="nama_penyewa"
                                class="w-full border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:border-primary focus:ring-primary/50 text-slate-900 font-medium">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">Durasi Sewa (Hari)</label>
                            <input type="number" wire:model="durasi"
                                class="w-full border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:border-primary focus:ring-primary/50 font-medium">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">Tanggal Sewa</label>
                            <input type="date" wire:model="tanggal_sewa"
                                class="w-full border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:border-primary focus:ring-primary/50 font-medium">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">Jam Penjemputan</label>
                            <input type="time" wire:model="jam_jemput"
                                class="w-full border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:border-primary focus:ring-primary/50 font-medium">
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">Lokasi Penjemputan</label>
                        <input type="text" wire:model="lokasi_penjemputan"
                            class="w-full border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:border-primary focus:ring-primary/50 font-medium">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">Trip Tujuan</label>
                        <input type="text" wire:model="trip_tujuan"
                            class="w-full border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:border-primary focus:ring-primary/50 font-medium">
                    </div>
                </form>
            </div>

            {{-- KOLOM KANAN: RINGKASAN PESANAN --}}
            <div class="w-full lg:w-1/3">
                <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden sticky top-24">
                    <div class="p-6 bg-slate-900 text-white">
                        <h3 class="font-bold text-lg">Ringkasan Pesanan</h3>
                    </div>

                    <div class="p-6 space-y-4">
                        <div class="flex gap-4 items-center border-b border-slate-100 pb-4">
                            @if($vehicle->fotoUtama)
                                <img src="{{ asset('storage/' . $vehicle->fotoUtama->path_foto) }}"
                                    class="w-20 h-16 object-cover rounded-md border border-slate-200">
                            @endif
                            <div>
                                <p class="font-bold text-slate-900">{{ $vehicle->merk }}</p>
                                <p class="text-sm text-slate-500">{{ $vehicle->plat_nomor }} • {{ $vehicle->jenis }}</p>
                            </div>
                        </div>

                        <div class="space-y-2 text-sm text-slate-600">
                            <div class="flex justify-between">
                                <span>Harga / Hari</span>
                                <span>Rp {{ number_format($vehicle->harga_sewa_per_hari, 0, ',', '.') }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Durasi</span>
                                <span>{{ $durasi ?: 1 }} Hari</span>
                            </div>
                            <div class="flex justify-between text-emerald-600">
                                <span>Biaya Layanan</span>
                                <span>Gratis</span>
                            </div>
                        </div>

                        <div class="pt-4 mt-2 border-t border-slate-100">
                            <div class="flex justify-between items-center mb-6">
                                <span class="font-bold text-slate-900">Total Pembayaran</span>
                                <span class="text-xl font-extrabold text-primary">
                                    Rp {{ number_format($vehicle->harga_sewa_per_hari * ($durasi ?: 1), 0, ',', '.') }}
                                </span>
                            </div>

                            {{-- Nanti tombol ini yang akan memproses insert ke tabel transaksi --}}
                            <button
                                class="w-full bg-primary hover:bg-primaryDark text-white py-3.5 rounded-xl font-bold transition shadow-sm">
                                Konfirmasi & Bayar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>