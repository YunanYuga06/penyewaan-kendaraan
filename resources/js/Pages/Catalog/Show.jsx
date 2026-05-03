import { Head, Link } from '@inertiajs/react';
import ImageCarousel from '@/Components/ImageCarousel';
import FrontendLayout from '@/Layouts/FrontendLayout';

export default function CatalogShow({ kendaraan, addOns }) {
    return (
        <FrontendLayout title={kendaraan.merk + ' - SewaMobil'}>
            <Head title={kendaraan.merk + ' - SewaMobil'} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link href={route('catalog.index')} className="text-indigo-600 hover:text-indigo-800 mb-4 inline-flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Kembali ke Katalog
                </Link>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
                    <div>
                        <ImageCarousel images={kendaraan.galeri || []} />
                        <div className="mt-6 bg-white rounded-lg shadow p-6">
                            <h1 className="text-2xl font-bold text-gray-900">{kendaraan.merk}</h1>
                            <p className="text-gray-500">Plat Nomor: {kendaraan.plat_nomor}</p>
                            <p className="mt-2 text-3xl font-bold text-indigo-600">
                                Rp {Number(kendaraan.harga_sewa_per_hari).toLocaleString('id-ID')}<span className="text-lg text-gray-500">/hari</span>
                            </p>
                            <p className="mt-2 text-sm text-gray-500">Jarak Tempuh: {Number(kendaraan.jarak_tempuh).toLocaleString('id-ID')} km</p>
                        </div>
                        {addOns && addOns.length > 0 && (
                            <div className="mt-6 bg-white rounded-lg shadow p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Layanan Tambahan Tersedia</h2>
                                <div className="space-y-3">
                                    {addOns.map((addon) => (
                                        <div key={addon.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div className="flex items-center">
                                                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="font-medium text-gray-900">{addon.nama_layanan}</span>
                                            </div>
                                            <span className="text-indigo-600 font-semibold">Rp {Number(addon.harga).toLocaleString('id-ID')}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Siap Memesan?</h2>
                            <p className="text-gray-600 mb-6">Pilih tanggal sewa, lokasi antar, dan layanan tambahan yang Anda butuhkan pada halaman checkout.</p>
                            <Link href={route('checkout.create', kendaraan.id)} className="block w-full text-center px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
                                Pesan Sekarang
                            </Link>
                            <div className="mt-4 text-center">
                                <p className="text-sm text-slate-500 mb-2">Ada pertanyaan tentang mobil ini?</p>
                                <a
                                    href={`}https://wa.me/6281234567890?text=Halo%20Admin,%20saya%20ingin%20bertanya%20tentang%20mobil%20`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                    </svg>
                                    Hubungi via WhatsApp
                                </a>
                            </div>
                            <div className="mt-6 pt-4 border-t space-y-3 text-sm">
                                <div className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    <span className="text-gray-600">Kendaraan terawat dan diasuransikan</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-gray-600">Harga transparan, tanpa biaya tersembunyi</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-gray-600">Proses booking cepat dan mudah</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}