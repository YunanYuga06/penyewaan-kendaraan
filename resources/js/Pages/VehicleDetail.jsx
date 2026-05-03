import { useState } from 'react';
import { Link, Head, useForm } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';

export default function VehicleDetail({ vehicle, galeri = [] }) {
    const [activeImage, setActiveImage] = useState(galeri[0]?.url_foto ?? null);
    const { data, setData, post, processing, errors } = useForm({
        kendaraan_id: vehicle.id,
        tgl_sewa: '',
        tgl_kembali_rencana: '',
        lokasi_antar: '',
        bukti_transfer: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('kendaraan_id', data.kendaraan_id);
        formData.append('tgl_sewa', data.tgl_sewa);
        formData.append('tgl_kembali_rencana', data.tgl_kembali_rencana);
        formData.append('lokasi_antar', data.lokasi_antar);
        if (data.bukti_transfer) formData.append('bukti_transfer', data.bukti_transfer);
        post(route('checkout'), formData, { forceFormData: true });
    };

    return (
        <FrontendLayout title={`${vehicle.merk} - SewaMobil`}>
            <Head title={`${vehicle.merk} - SewaMobil`} />

            {/* Vehicle Detail Page */}
            <section className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <Link href={route('catalog.index')} className="text-indigo-600 mb-4 inline-flex items-center">Kembali ke Katalog</Link>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
                    {/* Left: Images */}
                    <div>
                        <div className="bg-gray-200 rounded-lg h-80 flex items-center justify-center text-gray-400">
                            {activeImage ? (
                                <img 
                                    src={`/storage/${activeImage}`}
                                    alt={vehicle.merk}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            ) : (
                                <span>Foto Utama</span>
                            )}
                        </div>
                        <div className="mt-4 flex gap-2">
                            {galeri.map((g, idx) => (
                                <div 
                                    key={idx}
                                    onClick={() => setActiveImage(g.url_foto)}
                                    className={`w-20 h-20 bg-gray-200 rounded cursor-pointer border-2 ${
                                        activeImage === g.url_foto ? 'border-indigo-500' : 'border-gray-300'
                                    }`}
                                >
                                    {g.url_foto && (
                                        <img 
                                            src={`/storage/${g.url_foto}`}
                                            alt={`${vehicle.merk} ${idx}`}
                                            className="w-full h-full object-cover rounded"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Right: Details & Booking */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{vehicle.merk}</h1>
                        <p className="text-gray-500">{vehicle.jenis} - {vehicle.plat_nomor}</p>
                        <p className="text-3xl font-bold text-indigo-600 mt-4">
                            Rp {Number(vehicle.harga_sewa_per_hari).toLocaleString('id-ID')}
                            <span className="text-lg text-gray-500">/hari</span>
                        </p>
                        
                        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tanggal Sewa</label>
                                <input 
                                    type="datetime-local" 
                                    value={data.tgl_sewa}
                                    onChange={(e) => setData('tgl_sewa', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                                {errors.tgl_sewa && <p className="text-red-600 text-sm mt-1">{errors.tgl_sewa}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tanggal Kembali</label>
                                <input 
                                    type="datetime-local"
                                    value={data.tgl_kembali_rencana}
                                    onChange={(e) => setData('tgl_kembali_rencana', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                                {errors.tgl_kembali_rencana && <p className="text-red-600 text-sm mt-1">{errors.tgl_kembali_rencana}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Lokasi Antar</label>
                                <textarea 
                                    value={data.lokasi_antar}
                                    onChange={(e) => setData('lokasi_antar', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    rows="3"
                                    required
                                ></textarea>
                                {errors.lokasi_antar && <p className="text-red-600 text-sm mt-1">{errors.lokasi_antar}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Bukti Transfer</label>
                                <input 
                                    type="file"
                                    onChange={(e) => setData('bukti_transfer', e.target.files[0])}
                                    className="w-full"
                                />
                                {errors.bukti_transfer && <p className="text-red-600 text-sm mt-1">{errors.bukti_transfer}</p>}
                            </div>
                            <button 
                                type="submit"
                                disabled={processing}
                                className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                            >
                                {processing ? 'Memproses...' : 'Pesan Sekarang'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </FrontendLayout>
    );
}
