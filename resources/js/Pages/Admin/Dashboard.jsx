import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import StatusBadge from '@/Components/StatusBadge';

export default function AdminDashboard({ stats, recentPemesanan }) {
    const [showingNav, setShowingNav] = useState(false);

    return (
        <>
            <Head title="Admin Dashboard" />
            <div className="min-h-screen bg-gray-100">
                {/* Admin Navbar */}
                <nav className="bg-indigo-800 text-white">
                    <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                        <div className="flex items-center space-x-8">
                            <h1 className="text-xl font-bold">Admin Panel</h1>
                            <div className="hidden md:flex space-x-6">
                                <Link href={route('admin.dashboard')} className="hover:text-indigo-200 font-medium">Dashboard</Link>
                                <Link href={route('admin.kendaraan.index')} className="hover:text-indigo-200">Kendaraan</Link>
                                <Link href={route('admin.pemesanan.index')} className="hover:text-indigo-200">Pemesanan</Link>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="hidden sm:inline">Admin</span>
                            <div className="relative">
                                <button onClick={() => setShowingNav(!showingNav)} className="flex items-center gap-2 hover:text-indigo-200">
                                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" /></svg>
                                </button>
                                {showingNav && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                        <Link href={route('logout')} method="post" as="button" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Logout</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Dashboard Content */}
                <div className="max-w-7xl mx-auto px-4 py-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-lg shadow p-6"><p className="text-sm text-gray-500">Total Kendaraan</p><p className="text-3xl font-bold text-indigo-600">{stats?.totalKendaraan || 0}</p></div>
                        <div className="bg-white rounded-lg shadow p-6"><p className="text-sm text-gray-500">Tersedia</p><p className="text-3xl font-bold text-green-600">{stats?.kendaraanTersedia || 0}</p></div>
                        <div className="bg-white rounded-lg shadow p-6"><p className="text-sm text-gray-500">Pesanan Aktif</p><p className="text-3xl font-bold text-blue-600">{stats?.pemesananAktif || 0}</p></div>
                        <div className="bg-white rounded-lg shadow p-6"><p className="text-sm text-gray-500">Pendapatan</p><p className="text-3xl font-bold text-emerald-600">Rp {(stats?.totalPendapatan || 0).toLocaleString('id-ID')}</p></div>
                    </div>

                    {/* Recent Orders Table */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold mb-4">Pesanan Terbaru</h2>
                        {recentPemesanan && recentPemesanan.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead><tr><th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Penyewa</th><th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Kendaraan</th><th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th><th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th><th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th></tr></thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {recentPemesanan.map((item) => (
                                            <tr key={item.id}>
                                                <td className="px-4 py-3 text-sm">{item.penyewa?.user?.name}</td>
                                                <td className="px-4 py-3 text-sm">{item.kendaraan?.merk}</td>
                                                <td className="px-4 py-3 text-sm">{new Date(item.tgl_sewa).toLocaleDateString('id-ID')}</td>
                                                <td className="px-4 py-3 text-sm">Rp {Number(item.total_biaya).toLocaleString('id-ID')}</td>
                                                <td className="px-4 py-3"><StatusBadge status={item.status_pesanan} size="sm" /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-8">Belum ada pesanan.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
