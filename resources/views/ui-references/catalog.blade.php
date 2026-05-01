<!-- Catalog Page -->
<section class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Katalog Kendaraan</h1>
    <!-- Filters -->
    <div class="bg-white p-4 rounded-lg shadow mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input type="text" placeholder="Cari merk..." class="px-3 py-2 border border-gray-300 rounded-md" />
            <input type="number" placeholder="Harga Min" class="px-3 py-2 border border-gray-300 rounded-md" />
            <input type="number" placeholder="Harga Max" class="px-3 py-2 border border-gray-300 rounded-md" />
            <button class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Filter</button>
        </div>
    </div>
    <!-- Vehicle Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Repeat vehicle cards -->
        <div class="bg-white rounded-xl shadow-md overflow-hidden">
            <div class="h-48 bg-gray-200 flex items-center justify-center text-gray-400"><span>Foto</span></div>
            <div class="p-6"><h3 class="text-lg font-semibold">Toyota Avanza</h3><p class="text-2xl font-bold text-indigo-600 mt-2">Rp 75.000/jam</p><a href="/kendaraan/1" class="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-md">Detail</a></div>
        </div>
    </div>
</section>
