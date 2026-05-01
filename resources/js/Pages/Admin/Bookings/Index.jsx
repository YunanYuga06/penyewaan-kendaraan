import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import StatusBadge from '@/Components/StatusBadge';

export default function AdminBookingsIndex({ pemesanan }) {
    const { data: statusData, setData, put, processing } = useForm({
        status_pesanan: '',
    });

    const updateStatus = (id, status) => {
        put(route('admin.pemesanan.status', id), { data: { status_pesanan: status } });
    };

    const verifyPayment = (id, status) => {
        put(route('admin.pembayaran.verifikasi', id), { data: { status_bayar: status } });
    };

    return (
        <AdminLayout title="Kelola Pemesanan">
            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">Kelola Pemesanan</h1>
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Penyewa</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kendaraan</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {pemesanan.data?.map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-4 py-3 text-sm">{item.penyewa?.user?.name}</td>
                                        <td className="px-4 py-3 text-sm">{item.kendaraan?.merk}</td>
                                        <td className="px-4 py-3 text-sm">{new Date(item.tgl_sewa).toLocaleDateString('id-ID')}</td>
                                        <td className="px-4 py-3 text-sm">Rp {Number(item.total_biaya).toLocaleString('id-ID')}</td>
                                        <td className="px-4 py-3"><StatusBadge status={item.status_pesanan} size="sm" /></td>
                                        <td className="px-4 py-3 text-sm space-x-2">
                                            {item.status_pesanan === 'Pending' && (
                                                <button onClick={() => updateStatus(item.id, 'Aktif')} className="text-green-600 hover:text-green-900">Aktifkan</button>
                                            )}
                                            {item.status_pesanan === 'Aktif' && (
                                                <button onClick={() => updateStatus(item.id, 'Selesai')} className="text-blue-600 hover:text-blue-900">Selesai</button>
                                            )}
                                            {(item.status_pesanan === 'Pending' || item.status_pesanan === 'Aktif') && (
                                                <button onClick={() => updateStatus(item.id, 'Batal')} className="text-red-600 hover:text-red-900">Batal</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
