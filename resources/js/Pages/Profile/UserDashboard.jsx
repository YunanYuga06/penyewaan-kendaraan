import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import FrontendLayout from '@/Layouts/FrontendLayout';
import StatusBadge from '@/Components/StatusBadge';

export default function UserDashboard({ riwayat }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const [activeTab, setActiveTab] = useState('dashboard');

    const stats = riwayat?.data || [];
    const totalPesanan = riwayat?.total || 0;
    const selesai = stats.filter((s) => s.status_pesanan === 'Selesai').length;
    const aktif = stats.filter((s) => s.status_pesanan === 'Aktif').length;

    const tabs = [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'riwayat', label: 'Riwayat Pesanan' },
        { id: 'pengaturan', label: 'Pengaturan' },
    ];

    const handleLogout = () => router.post(route('logout'));

    return (
        <FrontendLayout title="Akun Saya">
            <section className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Akun Saya</h1>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-2xl font-bold">{user.name?.charAt(0).toUpperCase()}</div>
                            <div><p className="font-semibold">{user.name}</p><p className="text-sm text-gray-500">{user.email}</p></div>
                        </div>
                        <nav className="space-y-2">
                            {tabs.map((t) => (
                                <button key={t.id} onClick={() => setActiveTab(t.id)} className={`w-full text-left px-3 py-2 rounded ${activeTab === t.id ? 'bg-indigo-50 text-indigo-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>{t.label}</button>
                            ))}
                            <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded text-red-600 hover:bg-red-50">Keluar</button>
                        </nav>
                    </div>
                    {/* Content */}
                    <div className="lg:col-span-3">
                        {activeTab === 'dashboard' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-blue-50 p-4 rounded"><p className="text-sm text-gray-500">Total Pesanan</p><p className="text-2xl font-bold">{totalPesanan}</p></div>
                                    <div className="bg-green-50 p-4 rounded"><p className="text-sm text-gray-500">Selesai</p><p className="text-2xl font-bold">{selesai}</p></div>
                                    <div className="bg-yellow-50 p-4 rounded"><p className="text-sm text-gray-500">Aktif</p><p className="text-2xl font-bold">{aktif}</p></div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'riwayat' && (
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-lg font-semibold mb-4">Riwayat Pesanan</h2>
                                {stats.length > 0 ? (
                                    <div className="space-y-4">
                                        {stats.map((item) => (
                                            <div key={item.id} className="border rounded-lg p-4">
                                                <div className="flex justify-between">
                                                    <div><h3 className="font-semibold">{item.kendaraan.merk}</h3><p className="text-sm text-gray-500">{new Date(item.tgl_sewa).toLocaleDateString('id-ID')} - {new Date(item.tgl_kembali_rencana).toLocaleDateString('id-ID')}</p></div>
                                                    <div className="text-right"><StatusBadge status={item.status_pesanan} size="sm" /><p className="mt-1 font-semibold text-indigo-600">Rp {Number(item.total_biaya).toLocaleString('id-ID')}</p></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (<p className="text-gray-500 text-center py-8">Belum ada pesanan.</p>)}
                            </div>
                        )}
                        {activeTab === 'pengaturan' && (
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-lg font-semibold mb-4">Pengaturan Profil</h2>
                                <Link href={route('profile.show')} className="text-indigo-600 hover:text-indigo-800">Kelola profil di halaman pengaturan Jetstream &rarr;</Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </FrontendLayout>
    );
}
