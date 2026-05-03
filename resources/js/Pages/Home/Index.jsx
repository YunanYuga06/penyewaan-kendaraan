import { Link, usePage, Head } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';

export default function Home({ featuredVehicles = [] }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <FrontendLayout title="SewaMobil - Rental Kendaraan Terpercaya">
            <Head title="SewaMobil - Rental Kendaraan Terpercaya" />

            {/* Hero Section */}
            <section className="relative bg-indigo-900 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Rental Kendaraan Mudah & Terpercaya</h1>
                    <p className="text-xl text-indigo-200 mb-8 max-w-2xl mx-auto">Pilihan kendaraan terbaik untuk perjalanan bisnis, liburan, atau kebutuhan harian Anda.</p>
                    <form className="max-w-2xl mx-auto bg-white rounded-lg p-4 shadow-lg flex gap-4">
                        <input type="text" placeholder="Cari kendaraan..." className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        <button type="submit" className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 font-medium">Cari</button>
                    </form>
                </div>
            </section>

            {/* Featured Vehicles */}
            <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">Kendaraan Unggulan</h2>
                    <p className="mt-4 text-gray-600">Pilihan terbaik untuk kebutuhan Anda</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {(featuredVehicles || []).slice(0, 3).map((vehicle) => {
                        const mainPhoto = vehicle.galeri?.find(g => g.is_utama) || vehicle.galeri?.[0];
                        return (
                            <div key={vehicle.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                                <div className="relative h-48 bg-gray-200">
                                    <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold ${
                                        vehicle.status === 'Tersedia' ? 'bg-green-500 text-white' :
                                        vehicle.status === 'Disewa' ? 'bg-yellow-500 text-white' :
                                        'bg-red-500 text-white'
                                    }`}>{vehicle.status}</div>
                                    {mainPhoto ? (
                                        <img src={`/storage/${mainPhoto.url_foto}`} alt={vehicle.merk} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-400">
                                            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-900">{vehicle.merk}</h3>
                                    <p className="text-sm text-gray-500">{vehicle.jenis || 'N/A'} - {vehicle.plat_nomor}</p>
                                    <div className="mt-4 flex justify-between items-center">
                                        <span className="text-2xl font-bold text-indigo-600">Rp {Number(vehicle.harga_sewa_per_hari).toLocaleString('id-ID')}<span className="text-sm text-gray-500 font-normal">/hari</span></span>
                                        <Link href={route('catalog.show', vehicle.id)} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm">Detail</Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Mengapa Memilih Kami?</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Terpercaya & Aman</h3>
                            <p className="text-gray-600">Semua kendaraan terawat dan diasuransikan</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Harga Transparan</h3>
                            <p className="text-gray-600">Tidak ada biaya tersembunyi</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Proses Cepat</h3>
                            <p className="text-gray-600">Booking online dalam hitungan menit</p>
                        </div>
                    </div>
                </div>
            </section>
        </FrontendLayout>
    );
}
