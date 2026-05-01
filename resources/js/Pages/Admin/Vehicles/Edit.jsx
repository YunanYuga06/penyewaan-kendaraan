import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminVehiclesEdit({ vehicle }) {
    const { data, setData, put, processing, errors } = useForm({
        plat_nomor: vehicle.plat_nomor,
        merk: vehicle.merk,
        harga_sewa_per_jam: vehicle.harga_sewa_per_jam,
        status: vehicle.status,
        jarak_tempuh: vehicle.jarak_tempuh,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.kendaraan.update', vehicle.id));
    };

    return (
        <AdminLayout title="Edit Kendaraan">
            <div className="py-8">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Kendaraan</h1>
                    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
                        {errors.plat_nomor && <p className="text-sm text-red-600">{errors.plat_nomor}</p>}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Plat Nomor</label>
                            <input type="text" value={data.plat_nomor} onChange={(e) => setData('plat_nomor', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Merk</label>
                            <input type="text" value={data.merk} onChange={(e) => setData('merk', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Harga Sewa per Jam</label>
                            <input type="number" step="0.01" value={data.harga_sewa_per_jam} onChange={(e) => setData('harga_sewa_per_jam', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select value={data.status} onChange={(e) => setData('status', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                <option value="Tersedia">Tersedia</option>
                                <option value="Disewa">Disewa</option>
                                <option value="Maintenance">Maintenance</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Jarak Tempuh (km)</label>
                            <input type="number" value={data.jarak_tempuh} onChange={(e) => setData('jarak_tempuh', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div className="flex gap-3 pt-4">
                            <button type="submit" disabled={processing} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 transition">Update</button>
                            <a href={route('admin.kendaraan.index')} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition">Batal</a>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
