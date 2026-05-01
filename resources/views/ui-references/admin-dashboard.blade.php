<!-- Admin Dashboard -->
<section class="min-h-screen bg-gray-100">
    <nav class="bg-indigo-800 text-white">
        <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 class="text-xl font-bold">Admin Panel</h1>
            <div class="flex items-center gap-4"><span>Admin User</span><a href="/logout" class="text-indigo-200 hover:text-white">Logout</a></div>
        </div>
    </nav>
    <div class="max-w-7xl mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="bg-white rounded-lg shadow p-6"><p class="text-sm text-gray-500">Total Kendaraan</p><p class="text-3xl font-bold text-indigo-600">45</p></div>
            <div class="bg-white rounded-lg shadow p-6"><p class="text-sm text-gray-500">Tersedia</p><p class="text-3xl font-bold text-green-600">30</p></div>
            <div class="bg-white rounded-lg shadow p-6"><p class="text-sm text-gray-500">Pesanan Aktif</p><p class="text-3xl font-bold text-blue-600">15</p></div>
            <div class="bg-white rounded-lg shadow p-6"><p class="text-sm text-gray-500">Pendapatan</p><p class="text-3xl font-bold text-emerald-600">Rp 45M</p></div>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-lg font-semibold mb-4">Pesanan Terbaru</h2>
            <table class="min-w-full divide-y divide-gray-200"><thead><tr><th class="px-4 py-2 text-left text-xs text-gray-500">Penyewa</th><th class="px-4 py-2 text-left text-xs text-gray-500">Kendaraan</th><th class="px-4 py-2 text-left text-xs text-gray-500">Status</th><th class="px-4 py-2 text-left text-xs text-gray-500">Aksi</th></tr></thead><tbody><tr><td class="px-4 py-2">John Doe</td><td class="px-4 py-2">Toyota Avanza</td><td class="px-4 py-2">Pending</td><td class="px-4 py-2"><button class="text-green-600">Verifikasi</button></td></tr></tbody></table>
        </div>
    </div>
</section>
