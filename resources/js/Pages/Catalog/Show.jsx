import { Head, Link, useForm } from '@inertiajs/react';
import ImageCarousel from '@/Components/ImageCarousel';
import UploadForm from '@/Components/UploadForm';

export default function CatalogShow({ vehicle, addOns }) {
    const { data, setData, post, processing, errors } = useForm({
        kendaraan_id: vehicle.id,
        tgl_sewa: '',
        tgl_kembali_rencana: '',
        lokasi_antar: '',
        layanan_ids: [],
        bukti_transfer: null,
    });

    const toggleAddOn = (id) => {
        const selected = data.layanan_ids.includes(id)
            ? data.layanan_ids.filter((i) => i !== id)
            : [...data.layanan_ids, id];
        setData('layanan_ids', selected);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('kendaraan_id', data.kendaraan_id);
        formData.append('tgl_sewa', data.tgl_sewa);
        formData.append('tgl_kembali_rencana', data.tgl_kembali_rencana);
        formData.append('lokasi_antar', data.lokasi_antar);
        data.layanan_ids.forEach((id) => formData.append('layanan_ids[]', id));
        if (data.bukti_transfer) formData.append('bukti_transfer', data.bukti_transfer);
        post(route('checkout'), formData, { forceFormData: true });
    };

    return (
        <>
            <Head title={vehicle.merk} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link href={route('catalog.index')} className="text-indigo-600 hover:text-indigo-800 mb-4 inline-flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Kembali ke Katalog
                </Link>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
                    {/* Left: Image & Details */}
                    <div>
                        <ImageCarousel images={vehicle.galeri || []} />
                        <div className="mt-6 bg-white rounded-lg shadow p-6">
                            <h1 className="text-2xl font-bold text-gray-900">{vehicle.merk}</h1>
                            <p className="text-gray-500">Plat Nomor: {vehicle.plat_nomor}</p>
                            <p className="mt-2 text-3xl font-bold text-indigo-600">
                                Rp {Number(vehicle.harga_sewa_per_jam).toLocaleString('id-ID')}<span className="text-lg text-gray-500">/jam</span>
                            </p>
                            <p className="mt-2 text-sm text-gray-500">Jarak Tempuh: {Number(vehicle.jarak_tempuh).toLocaleString('id-ID')} km</p>
                        </div>
                        {/* Add-ons */}
                        {addOns && addOns.length > 0 && (
                            <div className="mt-6 bg-white rounded-lg shadow p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Layanan Tambahan</h2>
                                <div className="space-y-3">
                                    {addOns.map((addon) => (
                                        <label key={addon.id} className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                                            <div className="flex items-center">
                                                <input type="checkbox" checked={data.layanan_ids.includes(addon.id)} onChange={() => toggleAddOn(addon.id)} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                                                <span className="ml-3 font-medium text-gray-900">{addon.nama_layanan}</span>
                                            </div>
                                            <span className="text-indigo-600 font-semibold">Rp {Number(addon.harga).toLocaleString('id-ID')}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Right: Booking Form */}
                    <div>
                        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Form Pemesanan</h2>
                            {errors.error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{errors.error}</div>}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Sewa</label>
                                    <input type="datetime-local" value={data.tgl_sewa} onChange={(e) => setData('tgl_sewa', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                                    {errors.tgl_sewa && <p className="mt-1 text-sm text-red-600">{errors.tgl_sewa}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Kembali</label>
                                    <input type="datetime-local" value={data.tgl_kembali_rencana} onChange={(e) => setData('tgl_kembali_rencana', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                                    {errors.tgl_kembali_rencana && <p className="mt-1 text-sm text-red-600">{errors.tgl_kembali_rencana}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi Antar</label>
                                    <textarea value={data.lokasi_antar} onChange={(e) => setData('lokasi_antar', e.target.value)} rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                                    {errors.lokasi_antar && <p className="mt-1 text-sm text-red-600">{errors.lokasi_antar}</p>}
                                </div>
                                <UploadForm
                                    label="Bukti Transfer DP"
                                    hint="Format: JPG, PNG, PDF. Maks: 2MB"
                                    error={errors.bukti_transfer}
                                    onChange={(file) => setData('bukti_transfer', file)}
                                />
                                <div className="pt-4 border-t">
                                    <p className="text-sm text-gray-500">DP yang harus dibayar (25%): <span className="font-semibold text-indigo-600">Hubungi admin untuk total</span></p>
                                </div>
                            </div>
                            <button type="submit" disabled={processing} className="mt-6 w-full px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition">
                                {processing ? 'Memproses...' : 'Pesan Sekarang'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
