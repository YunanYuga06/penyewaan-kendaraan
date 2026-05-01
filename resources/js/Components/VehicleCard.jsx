import { Link } from '@inertiajs/react';

export default function VehicleCard({ vehicle }) {
    const mainPhoto = vehicle.galeri?.find(g => g.is_utama) || vehicle.galeri?.[0];

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48 bg-gray-200">
                {mainPhoto ? (
                    <img src={mainPhoto.url_foto} alt={vehicle.merk} className="w-full h-full object-cover" />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
                <span className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full ${
                    vehicle.status === 'Tersedia' ? 'bg-green-100 text-green-800' :
                    vehicle.status === 'Disewa' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                }`}>
                    {vehicle.status}
                </span>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{vehicle.merk}</h3>
                <p className="text-sm text-gray-500">{vehicle.plat_nomor}</p>
                <div className="mt-3 flex items-center justify-between">
                    <div>
                        <span className="text-xl font-bold text-indigo-600">Rp {Number(vehicle.harga_sewa_per_jam).toLocaleString('id-ID')}</span>
                        <span className="text-sm text-gray-500">/jam</span>
                    </div>
                    <Link
                        href={route('catalog.show', vehicle.id)}
                        className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition"
                    >
                        Lihat Detail
                    </Link>
                </div>
            </div>
        </div>
    );
}
