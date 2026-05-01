import { Head, Link, useForm } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';
import ImageCarousel from '@/Components/ImageCarousel';
import UploadForm from '@/Components/UploadForm';

export default function VehicleDetail({ vehicle, addOns }) {
    const { data, setData, post, processing, errors } = useForm({
        kendaraan_id: vehicle.id,
        tgl_sewa: '',
        tgl_kembali_rencana: '',
        lokasi_antar: '',
        layanan_ids: [],
        bukti_transfer: null,
    });

    const toggleAddOn = (id) => {
        setData('layanan_ids', data.layanan_ids.includes(id) ? data.layanan_ids.filter((i) => i !== id) : [...data.layanan_ids, id]);
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
        <FrontendLayout title={vehicle.merk}>
            <section className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <Link href={route('catalog.index')} className="text-indigo-600 mb-4 inline-flex items-center hover:text-indigo-800">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    Kembali ke Katalog
                </Link>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
                    <div>
                        <ImageCarousel images={vehicle.galeri || []} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{vehicle.merk}</h1>
                        <p className="text-gray-500">{vehicle.plat_nomor}</p>
                        <p className="text-3xl font-bold text-indigo-600 mt-4">Rp {Number(vehicle.harga_sewa_per_jam).toLocaleString('id-ID')}<span className="text-lg text-gray-500">/jam</span></p>
                        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                            {errors.error && <div className="p-3 bg-red-100 text-red-700 rounded">{errors.error}</div>}
                            <div><label className="block text-sm font-medium text-gray-700">Tanggal Sewa</label><input type="datetime-local" value={data.tgl_sewa} onChange={(e) => setData('tgl_sewa', e.target.value)} className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required /></div>
                            <div><label className="block text-sm font-medium text-gray-700">Tanggal Kembali</label><input type="datetime-local" value={data.tgl_kembali_rencana} onChange={(e) => setData('tgl_kembali_rencana', e.target.value)} className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required /></div>
                            <div><label className="block text-sm font-medium text-gray-700">Lokasi Antar</label><textarea value={data.lokasi_antar} onChange={(e) => setData('lokasi_antar', e.target.value)} rows="3" className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required /></div>
                            {addOns?.length > 0 && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Layanan Tambahan</label>
                                    <div className="space-y-2">
                                        {addOns.map((a) => (
                                            <label key={a.id} className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                                                <div className="flex items-center"><input type="checkbox" checked={data.layanan_ids.includes(a.id)} onChange={() => toggleAddOn(a.id)} className="h-4 w-4 text-indigo-600 rounded" /><span className="ml-3">{a.nama_layanan}</span></div>
                                                <span className="text-indigo-600 font-semibold">Rp {Number(a.harga).toLocaleString('id-ID')}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <UploadForm label="Bukti Transfer DP" hint="JPG, PNG, PDF. Maks: 2MB" error={errors.bukti_transfer} onChange={(f) => setData('bukti_transfer', f)} />
                            <button type="submit" disabled={processing} className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50 font-medium">{processing ? 'Memproses...' : 'Pesan Sekarang'}</button>
                        </form>
                    </div>
                </div>
            </section>
        </FrontendLayout>
    );
}
