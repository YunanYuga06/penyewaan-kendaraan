import { Head, Link } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';

export default function PaymentSuccess({ pemesanan }) {
    return (
        <FrontendLayout title="Pembayaran Berhasil - SewaMobil">
            <Head title="Pembayaran Berhasil - SewaMobil" />

            <section className="max-w-2xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow p-8 text-center">
                    {/* Success Icon */}
                    <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Pemesanan Berhasil!</h1>
                    <p className="text-gray-600 mb-8">Bukti pembayaran Anda telah kami terima dan sedang menunggu verifikasi dari tim kami.</p>

                    {/* Order Summary */}
                    <div className="bg-gray-50 rounded-lg p-6 text-left mb-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Detail Pemesanan</h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">No. Pemesanan</span>
                                <span className="font-semibold text-gray-900">#{pemesanan.id}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Kendaraan</span>
                                <span className="font-semibold text-gray-900">{pemesanan.kendaraan.merk}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tanggal Sewa</span>
                                <span className="font-medium text-gray-900">{new Date(pemesanan.tgl_sewa).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tanggal Kembali</span>
                                <span className="font-medium text-gray-900">{new Date(pemesanan.tgl_kembali_rencana).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Lokasi Antar</span>
                                <span className="font-medium text-gray-900 text-right max-w-xs truncate">{(pemesanan.area_penjemputan ? pemesanan.area_penjemputan + ' | ' : '') + (pemesanan.detail_alamat || '-')}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total Biaya</span>
                                <span className="font-bold text-indigo-600 text-base">Rp {Number(pemesanan.total_biaya).toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">DP (25%)</span>
                                <span className="font-medium text-amber-600">- Rp {Math.ceil(pemesanan.total_biaya * 0.25).toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t">
                                <span className="font-bold text-gray-900">Sisa Pembayaran</span>
                                <span className="font-bold text-green-600 text-base">Rp {(pemesanan.total_biaya - Math.ceil(pemesanan.total_biaya * 0.25)).toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t">
                                <span className="text-gray-600">Status</span>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">Menunggu Verifikasi</span>
                            </div>
                        </div>
                    </div>

                    {/* Info Box */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left mb-8">
                        <div className="flex gap-3">
                            <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div className="text-sm text-blue-700">
                                <p className="font-semibold mb-1">Langkah Selanjutnya:</p>
                                <ul className="list-disc list-inside space-y-1 text-blue-600">
                                    <li>Tim kami akan memverifikasi pembayaran Anda dalam 1x24 jam</li>
                                    <li>Anda akan mendapat notifikasi setelah verifikasi selesai</li>
                                    <li>Pantau status pesanan di halaman Riwayat Pesanan</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link href={route('dashboard.riwayat')} className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
                            Lihat Riwayat Pesanan
                        </Link>
                        <Link href={route('home')} className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition">
                            Kembali ke Beranda
                        </Link>
                    </div>
                </div>
            </section>
        </FrontendLayout>
    );
}
