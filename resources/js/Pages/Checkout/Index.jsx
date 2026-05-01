import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import UploadForm from '@/Components/UploadForm';
import StatusBadge from '@/Components/StatusBadge';

export default function CheckoutIndex({ pemesanan }) {
    const { data, setData, post, processing, errors } = useForm({
        bukti_transfer: null,
        jenis_bayar: 'Pelunasan',
    });

    const handleUpload = (e) => {
        e.preventDefault();
        post(route('payment.upload', pemesanan.id), { forceFormData: true });
    };

    return (
        <AppLayout title="Pembayaran">
            <div className="py-12">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link href={route('dashboard.riwayat')} className="text-indigo-600 hover:text-indigo-800 mb-4 inline-flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali
                    </Link>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Detail Pemesanan #{pemesanan.id}</h2>
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Kendaraan</span>
                                <span className="font-medium">{pemesanan.kendaraan.merk}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tanggal Sewa</span>
                                <span>{new Date(pemesanan.tgl_sewa).toLocaleDateString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tanggal Kembali</span>
                                <span>{new Date(pemesanan.tgl_kembali_rencana).toLocaleDateString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total Biaya</span>
                                <span className="font-bold text-indigo-600">Rp {Number(pemesanan.total_biaya).toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Status</span>
                                <StatusBadge status={pemesanan.status_pesanan} size="sm" />
                            </div>
                        </div>
                        {pemesanan.status_pesanan === 'Pending' && (
                            <>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Upload Bukti Pembayaran</h3>
                                <form onSubmit={handleUpload} className="space-y-4">
                                    {errors.error && <div className="p-3 bg-red-100 text-red-700 rounded">{errors.error}</div>}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Pembayaran</label>
                                        <select value={data.jenis_bayar} onChange={(e) => setData('jenis_bayar', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                            <option value="DP">DP</option>
                                            <option value="Pelunasan">Pelunasan</option>
                                            <option value="Denda">Denda</option>
                                        </select>
                                    </div>
                                    <UploadForm
                                        label="Bukti Transfer"
                                        hint="Format: JPG, PNG, PDF. Maks: 2MB"
                                        error={errors.bukti_transfer}
                                        onChange={(file) => setData('bukti_transfer', file)}
                                    />
                                    <button type="submit" disabled={processing} className="w-full px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition">
                                        {processing ? 'Mengunggah...' : 'Upload Bukti'}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
