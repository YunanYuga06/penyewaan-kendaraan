import { useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';

export default function Catalog({ kendaraan = [], filters = {} }) {
    const [searchMerk, setSearchMerk] = useState(filters.merk || '');
    const [priceMin, setPriceMin] = useState(filters.min_price || '');
    const [priceMax, setPriceMax] = useState(filters.max_price || '');

    return (
        <FrontendLayout title="Katalog Kendaraan - SewaMobil">
            <Head title="Katalog Kendaraan - SewaMobil" />

            {/* Catalog Page */}
            <section className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Katalog Kendaraan</h1>
                
                {/* Filters */}
                <div className="bg-white p-4 rounded-lg shadow mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <input 
                            type="text" 
                            placeholder="Cari merk..." 
                            value={searchMerk}
                            onChange={(e) => setSearchMerk(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md" 
                        />
                        <input 
                            type="number" 
                            placeholder="Harga Min" 
                            value={priceMin}
                            onChange={(e) => setPriceMin(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md" 
                        />
                        <input 
                            type="number" 
                            placeholder="Harga Max" 
                            value={priceMax}
                            onChange={(e) => setPriceMax(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md" 
                        />
                        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Filter</button>
                    </div>
                </div>
                
                {/* Vehicle Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {(kendaraan?.data || kendaraan || []).length === 0 ? (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-500 text-lg">Tidak ada kendaraan tersedia.</p>
                        </div>
                    ) : (
                        (kendaraan?.data || kendaraan || []).map((vehicle) => {
                            const mainPhoto = vehicle.galeri?.find(g => g.is_utama) || vehicle.galeri?.[0];
                            return (
                                <div key={vehicle.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                                    <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                                        {mainPhoto ? (
                                            <img 
                                                src={`/storage/${mainPhoto.url_foto}`}
                                                alt={vehicle.merk}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span>Foto</span>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold text-gray-900">{vehicle.merk}</h3>
                                        <p className="text-sm text-gray-500">{vehicle.plat_nomor} &bull; {vehicle.jenis || 'N/A'}</p>
                                        <p className="text-2xl font-bold text-indigo-600 mt-2">
                                            Rp {Number(vehicle.harga_sewa_per_hari).toLocaleString('id-ID')}/hari
                                        </p>
                                        <Link 
                                            href={route('catalog.show', vehicle.id)} 
                                            className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                                        >
                                            Detail
                                        </Link>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </section>
        </FrontendLayout>
    );
}