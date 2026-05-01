import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import StatusBadge from '@/Components/StatusBadge';

export default function AdminVehiclesIndex({ vehicles }) {
    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus kendaraan ini?')) {
            router.delete(route('admin.kendaraan.destroy', id));
        }
    };

    return (
        <AdminLayout title="Kelola Kendaraan">
            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Kelola Kendaraan</h1>
                        <Link href={route('admin.kendaraan.create')} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">Tambah Kendaraan</Link>
                    </div>
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plat Nomor</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Merk</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Harga/Jam</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {vehicles.data?.map((v) => (
                                    <tr key={v.id}>
                                        <td className="px-6 py-4 text-sm">{v.plat_nomor}</td>
                                        <td className="px-6 py-4 text-sm">{v.merk}</td>
                                        <td className="px-6 py-4 text-sm">Rp {Number(v.harga_sewa_per_jam).toLocaleString('id-ID')}</td>
                                        <td className="px-6 py-4"><StatusBadge status={v.status} size="sm" /></td>
                                        <td className="px-6 py-4 text-sm space-x-2">
                                            <Link href={route('admin.kendaraan.edit', v.id)} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                                            <button onClick={() => handleDelete(v.id)} className="text-red-600 hover:text-red-900">Hapus</button>
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
