import { Head, Link, useForm } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';
import UploadForm from '@/Components/UploadForm';

export default function CheckoutPayment({ pemesanan }) {
    const { data, setData, post, processing, errors } = useForm({
        bukti_transfer: null,
        ktp: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (data.bukti_transfer) formData.append('bukti_transfer', data.bukti_transfer);
        if (data.ktp) formData.append('ktp', data.ktp);
        post(route('payment.upload', pemesanan.id), formData, { forceFormData: true });
    };

    return (
        <FrontendLayout title="Pembayaran - SewaMobil">
            <Head title="Pembayaran - SewaMobil" />

            <section className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <Link href={route('dashboard.riwayat')} className="text-indigo-600 hover:text-indigo-800 mb-4 inline-flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Kembali
                </Link>

                <div className="bg-white rounded-lg shadow p-6 mb-6">
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
                            <span className="text-gray-600">DP (25%)</span>
                            <span className="font-bold text-amber-600">Rp {Math.ceil(pemesanan.total_biaya * 0.25).toLocaleString('id-ID')}</span>
                        </div>
                    </div>

                    <div className="p-3 bg-amber-50 rounded-lg mb-6">
                        <p className="text-sm text-amber-700">Transfer ke:</p>
                        <p className="font-semibold text-amber-800">BCA 1234567890</p>
                        <p className="text-sm text-amber-700">a.n. PT SewaMobil Indonesia</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Dokumen Pembayaran</h3>

                    {errors.error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{errors.error}</div>
                    )}

                    <div className="space-y-4">
                        <UploadForm
                            label="Upload KTP"
                            hint="Format: JPG, PNG. Maks: 2MB"
                            error={errors.ktp}
                            onChange={(file) => setData('ktp', file)}
                        />

                        <UploadForm
                            label="Upload Bukti Transfer DP"
                            hint="Format: JPG, PNG, PDF. Maks: 2MB"
                            error={errors.bukti_transfer}
                            onChange={(file) => setData('bukti_transfer', file)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="mt-6 w-full px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                    >
                        {processing ? 'Mengunggah...' : 'Kirim Bukti Pembayaran'}
                    </button>
                </form>
            </section>
        </FrontendLayout>
    );
}