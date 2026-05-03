import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import StatusBadge from '@/Components/StatusBadge';

export default function Riwayat({ pemesanan, flash }) {
    return (
        <AppLayout title="Riwayat Pesanan">
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Riwayat Pesanan</h2>

                        {flash?.success && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-green-700 font-medium">{flash.success}</p>
                            </div>
                        )}

                        {pemesanan.data && pemesanan.data.length > 0 ? (
                            <div className="space-y-4">
                                {pemesanan.data.map((item) => (
                                    <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-xs font-mono text-gray-400">#{item.id}</span>
                                                    <h3 className="font-semibold text-lg text-gray-900">{item.kendaraan.merk}</h3>
                                                </div>
                                                <p className="text-sm text-gray-500">{item.kendaraan.plat_nomor}</p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {new Date(item.tgl_sewa).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                    {' '}-{' '}
                                                    {new Date(item.tgl_kembali_rencana).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                </p>
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <StatusBadge status={item.status_pesanan} />
                                                <p className="mt-2 font-semibold text-indigo-600">Rp {Number(item.total_biaya).toLocaleString('id-ID')}</p>
                                            </div>
                                        </div>

                                        {item.pembayaran && item.pembayaran.length > 0 && (
                                            <div className="mt-3 pt-3 border-t text-sm">
                                                <div className="flex flex-wrap gap-4">
                                                    <div>
                                                        <span className="text-gray-500">Pembayaran terakhir:</span>
                                                        <span className="ml-1 font-medium text-gray-700">{item.pembayaran[0].jenis_bayar}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-500">Status bayar:</span>
                                                        <span className={"ml-1 font-medium " + (item.pembayaran[0].status_bayar === "Lunas" ? "text-green-600" : item.pembayaran[0].status_bayar === "Menunggu" ? "text-yellow-600" : "text-red-600")}>{item.pembayaran[0].status_bayar}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="mt-3 pt-3 border-t flex flex-wrap gap-2">
                                            {item.status_pesanan === 'Pending' && (
                                                <Link href={route('checkout.payment', item.id)} className="px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                                                    Upload Bukti Bayar
                                                </Link>
                                            )}
                                            <Link href={route('dashboard.riwayat.show', item.id)} className="px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition">
                                                Lihat Detail
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <p className="text-gray-500 mb-4">Belum ada pesanan.</p>
                                <Link href={route('catalog.index')} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                                    Mulai Memesan
                                </Link>
                            </div>
                        )}

                        {pemesanan.links && pemesanan.links.length > 3 && (
                            <div className="mt-6 flex justify-center">
                                <div className="flex gap-1">
                                    {pemesanan.links.map((link, idx) => (
                                        <Link
                                            key={idx}
                                            href={link.url || '#'}
                                            className={"px-3 py-1.5 text-sm rounded-md " + (link.active ? "bg-indigo-600 text-white" : link.url ? "text-gray-700 hover:bg-gray-100" : "text-gray-300 cursor-not-allowed")}
                                        >
                                            {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}