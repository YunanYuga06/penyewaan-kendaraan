<div class="p-8"> {{-- SINGLE ROOT ELEMENT --}}

    <div class="flex justify-between items-center mb-6">
        <div>
            <h1 class="text-2xl font-bold text-slate-800">Manajemen Armada</h1>
            <p class="text-slate-500 text-sm">Kelola data kendaraan dan galeri foto</p>
        </div>
    </div>

    {{-- Pesan Sukses / Flash Message --}}
    @if (session()->has('message'))
        <div class="bg-emerald-50 text-emerald-700 p-4 rounded-xl mb-6 border border-emerald-200 flex items-center gap-3">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="font-medium">{{ session('message') }}</span>
        </div>
    @endif

    <div class="flex flex-col lg:flex-row gap-8">

        {{-- KOLOM KIRI: FORMULIR TAMBAH/EDIT --}}
        <div class="w-full lg:w-1/3">
            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm sticky top-24">
                <h2 class="font-bold text-lg mb-4 border-b pb-2">
                    {{ $isEditMode ? 'Edit Armada' : 'Tambah Armada Baru' }}
                </h2>

                <form wire:submit.prevent="save" class="space-y-4">

                    {{-- Input Plat Nomor --}}
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">Plat Nomor</label>
                        <input type="text" wire:model="plat_nomor"
                            class="w-full border-slate-300 rounded-lg shadow-sm focus:border-primary focus:ring focus:ring-primary/50 text-sm p-2.5 border"
                            placeholder="Contoh: R 1234 AB">
                        @error('plat_nomor') <span class="text-rose-500 text-xs mt-1">{{ $message }}</span> @enderror
                    </div>

                    {{-- Input Merk --}}
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">Merk Kendaraan</label>
                        <input type="text" wire:model="merk"
                            class="w-full border-slate-300 rounded-lg shadow-sm focus:border-primary focus:ring focus:ring-primary/50 text-sm p-2.5 border"
                            placeholder="Contoh: Toyota Avanza">
                        @error('merk') <span class="text-rose-500 text-xs mt-1">{{ $message }}</span> @enderror
                    </div>

                    {{-- Input Jenis & Status (Grid) --}}
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">Jenis</label>
                            <select wire:model="jenis"
                                class="w-full border-slate-300 rounded-lg shadow-sm focus:border-primary text-sm p-2.5 border">
                                <option value="">Pilih...</option>
                                <option value="MPV">MPV</option>
                                <option value="SUV">SUV</option>
                                <option value="City Car">City Car</option>
                            </select>
                            @error('jenis') <span class="text-rose-500 text-xs mt-1">{{ $message }}</span> @enderror
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">Status</label>
                            <select wire:model="status"
                                class="w-full border-slate-300 rounded-lg shadow-sm focus:border-primary text-sm p-2.5 border">
                                <option value="Tersedia">Tersedia</option>
                                <option value="Disewa">Disewa</option>
                                <option value="Maintenance">Maintenance</option>
                            </select>
                        </div>
                    </div>

                    {{-- Input Harga --}}
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">Harga Sewa / Hari (Rp)</label>
                        <input type="number" wire:model="harga"
                            class="w-full border-slate-300 rounded-lg shadow-sm focus:border-primary focus:ring focus:ring-primary/50 text-sm p-2.5 border"
                            placeholder="Contoh: 350000">
                        @error('harga') <span class="text-rose-500 text-xs mt-1">{{ $message }}</span> @enderror
                    </div>

                    {{-- Input Upload Foto Multi --}}
                    {{-- Input Upload Foto Multi --}}
                    <div class="pt-2">
                        <label class="block text-sm font-medium text-slate-700 mb-1">
                            {{ $isEditMode ? 'Tambah Foto Baru' : 'Unggah Galeri Foto' }}
                        </label>
                        <input type="file" wire:model="photos" multiple
                            class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition cursor-pointer">

                        {{-- PREVIEW FOTO BARU (Yang Sedang Dipilih) --}}
                        @if ($photos)
                            <div class="mt-3">
                                <p class="text-[10px] font-bold text-primary uppercase mb-2">Siap Diunggah:</p>
                                <div class="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                                    @foreach ($photos as $photo)
                                        <img src="{{ $photo->temporaryUrl() }}"
                                            class="h-16 w-16 object-cover rounded-lg border-2 border-primary shrink-0">
                                    @endforeach
                                </div>
                            </div>
                        @endif

                        {{-- MANAJEMEN GALERI EKSISTING (Hanya tampil saat Edit) --}}
                        @if($isEditMode && count($existingPhotos) > 0)
                            <div class="mt-4 p-3 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                                <p class="text-[10px] font-bold text-slate-500 uppercase mb-2">Galeri Saat Ini
                                    ({{ count($existingPhotos) }} Foto):</p>
                                <div class="grid grid-cols-3 gap-2">
                                    @foreach($existingPhotos as $item)
                                        <div class="relative group aspect-square" wire:key="photo-{{ $item->id }}">
                                            <img src="{{ asset('storage/' . $item->path_foto) }}"
                                                class="w-full h-full object-cover rounded-lg border">

                                            {{-- Badge Foto Utama --}}
                                            @if($item->is_utama)
                                                <span
                                                    class="absolute top-1 left-1 bg-amber-400 text-[8px] font-bold px-1 rounded text-white shadow-sm">Utama</span>
                                            @endif

                                            {{-- Tombol Hapus Foto --}}
                                            <button type="button" wire:click="deletePhoto({{ $item->id }})"
                                                wire:confirm="Hapus foto ini?"
                                                class="absolute top-1 right-1 bg-rose-500 text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition shadow-lg">
                                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path d="M6 18L18 6M6 6l12 12" stroke-width="3" />
                                                </svg>
                                            </button>
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                        @endif
                    </div>

                    {{-- Tombol Aksi --}}
                    <div class="flex gap-2 pt-4 border-t border-slate-100">
                        <button type="submit"
                            class="flex-1 bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primaryDark transition flex justify-center items-center">
                            <span wire:loading.remove wire:target="save">
                                {{ $isEditMode ? 'Simpan Perubahan' : 'Simpan Armada' }}
                            </span>

                            <span wire:loading wire:target="save" class="flex items-center gap-2">
                                <svg class="animate-spin h-4 w-4 text-white" ...></svg>
                                Memproses...
                            </span>
                        </button>

                        @if($isEditMode)
                            <button type="button" wire:click="cancelEdit"
                                class="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg font-medium hover:bg-slate-200 transition">
                                Batal
                            </button>
                        @endif
                    </div>
                </form>
            </div>
        </div>

        {{-- KOLOM KANAN: TABEL DATA --}}
        <div class="w-full lg:w-2/3">
            <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table class="w-full text-left">
                    <thead class="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200">
                        <tr>
                            <th class="px-6 py-4">Kendaraan</th>
                            <th class="px-6 py-4">Tarif & Status</th>
                            <th class="px-6 py-4 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        @forelse ($vehicles as $vehicle)
                            <tr class="hover:bg-slate-50 transition">
                                <td class="px-6 py-4 flex items-center gap-4">
                                    {{-- Menampilkan Foto Utama --}}
                                    <div class="h-12 w-16 bg-slate-200 rounded-md overflow-hidden shrink-0">
                                        @if($vehicle->fotoUtama)
                                            <img src="{{ asset('storage/' . $vehicle->fotoUtama->path_foto) }}"
                                                class="w-full h-full object-cover">
                                        @else
                                            <div class="w-full h-full flex items-center justify-center text-xs text-slate-400">
                                                No Img</div>
                                        @endif
                                    </div>
                                    <div>
                                        <div class="font-bold text-slate-900">{{ $vehicle->merk }}</div>
                                        <div class="text-xs text-slate-500">{{ $vehicle->plat_nomor }} •
                                            {{ $vehicle->jenis }}
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="font-medium text-slate-900">Rp
                                        {{ number_format($vehicle->harga_sewa_per_hari, 0, ',', '.') }}
                                    </div>
                                    <div class="mt-1">
                                        <span
                                            class="text-[10px] font-bold px-2 py-0.5 rounded-full {{ $vehicle->status === 'Tersedia' ? 'bg-emerald-100 text-emerald-700' : ($vehicle->status === 'Disewa' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700') }}">
                                            {{ $vehicle->status }}
                                        </span>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-right space-x-2">
                                    <button wire:click="edit({{ $vehicle->id }})"
                                        class="text-primary hover:text-primaryDark text-sm font-medium">Edit</button>
                                    <button wire:click="delete({{ $vehicle->id }})"
                                        wire:confirm="Yakin ingin menghapus kendaraan ini secara permanen?"
                                        class="text-rose-500 hover:text-rose-700 text-sm font-medium">Hapus</button>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="3" class="px-6 py-8 text-center text-slate-400">
                                    Belum ada data armada mobil. Silakan tambah melalui formulir di samping.
                                </td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</div>