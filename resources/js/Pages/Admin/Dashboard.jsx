import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Dashboard({
    activeBookings = 12,
    availableCars = 8,
    serviceAlerts = 2,
    todayIncome = 'Rp 4.2jt',
    recentBookings = [],
}) {
    return (
        <AdminLayout title="Dashboard Admin">
            <Head title="Dashboard Admin - SewaMobil" />

            <div className="p-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl border shadow-sm">
                        <p className="text-sm text-slate-500">Pemesanan Aktif</p>
                        <p className="text-3xl font-bold">{activeBookings}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border shadow-sm">
                        <p className="text-sm text-slate-500">Armada Tersedia</p>
                        <p className="text-3xl font-bold text-emerald-600">{availableCars}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-rose-100 bg-rose-50/30 shadow-sm">
                        <p className="text-sm text-rose-600 font-bold">Alert Servis</p>
                        <p className="text-3xl font-bold text-rose-700">{serviceAlerts}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border shadow-sm">
                        <p className="text-sm text-slate-500">Pendapatan Hari Ini</p>
                        <p className="text-3xl font-bold">{todayIncome}</p>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                    <div className="p-4 border-b flex justify-between">
                        <h2 className="font-bold">Permintaan Booking Terbaru</h2>
                    </div>
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                            <tr>
                                <th className="px-6 py-3">Penyewa</th>
                                <th className="px-6 py-3">Mobil</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentBookings.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="text-center p-4 text-slate-400">
                                        Belum ada data
                                    </td>
                                </tr>
                            ) : (
                                recentBookings.map((booking) => (
                                    <tr key={booking.id} className="border-b hover:bg-slate-50">
                                        <td className="px-6 py-4">{booking.user?.name ?? booking.nama_penyewa}</td>
                                        <td className="px-6 py-4">{booking.kendaraan?.merk}</td>
                                        <td className="px-6 py-4">{booking.status}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
