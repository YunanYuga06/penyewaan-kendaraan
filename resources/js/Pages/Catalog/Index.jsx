import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import VehicleCard from '@/Components/VehicleCard';

export default function CatalogIndex({ vehicles, filters }) {
    const [searchMerk, setSearchMerk] = useState(filters?.merk || '');
    const [minPrice, setMinPrice] = useState(filters?.min_price || '');
    const [maxPrice, setMaxPrice] = useState(filters?.max_price || '');

    const handleFilter = (e) => {
        e.preventDefault();
        router.get(route('catalog.index'), {
            merk: searchMerk || undefined,
            min_price: minPrice || undefined,
            max_price: maxPrice || undefined,
        }, { preserveState: true });
    };

    return (
        <>
            <Head title="Katalog Kendaraan" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Katalog Kendaraan</h1>
                {/* Filters */}
                <form onSubmit={handleFilter} className="bg-white p-4 rounded-lg shadow mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Merk</label>
                            <input type="text" value={searchMerk} onChange={(e) => setSearchMerk(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Contoh: Toyota" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Harga Min</label>
                            <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="0" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Harga Max</label>
                            <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="1000000" />
                        </div>
                        <div className="flex items-end">
                            <button type="submit" className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition">
                                Filter
                            </button>
                        </div>
                    </div>
                </form>
                {/* Vehicle Grid */}
                {vehicles.data && vehicles.data.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {vehicles.data.map((vehicle) => (
                                <VehicleCard key={vehicle.id} vehicle={vehicle} />
                            ))}
                        </div>
                        {/* Pagination */}
                        <div className="mt-8 flex justify-center gap-2">
                            {vehicles.links?.map((link, i) => (
                                link.url ? (
                                    <Link key={i} href={link.url} className={`px-3 py-2 rounded-md text-sm ${link.active ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`} dangerouslySetInnerHTML={{ __html: link.label }} />
                                ) : (
                                    <span key={i} className="px-3 py-2 rounded-md text-sm bg-gray-100 text-gray-400" dangerouslySetInnerHTML={{ __html: link.label }} />
                                )
                            ))}
                        </div>
                    </>
                ) : (
                    <p className="text-center text-gray-500 py-12">Tidak ada kendaraan yang ditemukan.</p>
                )}
            </div>
        </>
    );
}
