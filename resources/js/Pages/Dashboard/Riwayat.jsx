import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import StatusBadge from '@/Components/StatusBadge';

export default function Riwayat({ pemesanan }) {
    return (
        <AppLayout title="Riwayat Pesanan">
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Riwayat Pesanan</h2>
                        {pemesanan.data && pemesanan.data.length > 0 ? (
                            <div className="space-y-4">
                                {pemesanan.data.map((item) => (
                                    <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold text-lg text-gray-900">{item.kendaraan.merk}</h3>
                                                <p className="text-sm text-gray-500">{item.kendaraan.plat_nomor}</p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {new Date(item.tgl_sewa).toLocaleDateString('id-ID')} - {new Date(item.tgl_kembali_rencana).toLocaleDateString('id-ID')}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <StatusBadge status={item.status_pesanan} />
                                                <p className="mt-2 font-semibold text-indigo-600">Rp {Number(item.total_biaya).toLocaleString('id-ID')}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500 mb-4">Belum ada pesanan.</p>
                                <Link href={route('catalog.index')} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                                    Mulai Memesan
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
