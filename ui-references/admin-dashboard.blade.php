<div class="p-8"> {{-- SINGLE ROOT ELEMENT --}}
    {{-- STATS --}}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white p-6 rounded-xl border shadow-sm">
            <p class="text-sm text-slate-500">Pemesanan Aktif</p>
            <p class="text-3xl font-bold">{{ $activeBookings ?? 12 }}</p>
        </div>
        <div class="bg-white p-6 rounded-xl border shadow-sm">
            <p class="text-sm text-slate-500">Armada Tersedia</p>
            <p class="text-3xl font-bold text-emerald-600">{{ $availableCars ?? 8 }}</p>
        </div>
        <div class="bg-white p-6 rounded-xl border border-rose-100 bg-rose-50/30 shadow-sm">
            <p class="text-sm text-rose-600 font-bold">Alert Servis</p>
            <p class="text-3xl font-bold text-rose-700">{{ $serviceAlerts ?? 2 }}</p>
        </div>
        <div class="bg-white p-6 rounded-xl border shadow-sm">
            <p class="text-sm text-slate-500">Pendapatan Hari Ini</p>
            <p class="text-3xl font-bold">{{ $todayIncome ?? 'Rp 4.2jt' }}</p>
        </div>
    </div>

    {{-- TABLE --}}
    <div class="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div class="p-4 border-b flex justify-between">
            <h2 class="font-bold">Permintaan Booking Terbaru</h2>
        </div>
        <table class="w-full text-left">
            <thead class="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                    <th class="px-6 py-3">Penyewa</th>
                    <th class="px-6 py-3">Mobil</th>
                    <th class="px-6 py-3">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="3" class="text-center p-4 text-slate-400">Belum ada data</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>