import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Dashboard() {
    return (
        <AppLayout title="Dashboard">
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Selamat Datang!</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Link href={route('catalog.index')} className="p-6 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition">
                                <h3 className="text-lg font-semibold text-indigo-700">Cari Kendaraan</h3>
                                <p className="text-sm text-indigo-600 mt-2">Temukan kendaraan yang Anda butuhkan</p>
                            </Link>
                            <Link href={route('dashboard.riwayat')} className="p-6 bg-green-50 rounded-lg hover:bg-green-100 transition">
                                <h3 className="text-lg font-semibold text-green-700">Riwayat Pesanan</h3>
                                <p className="text-sm text-green-600 mt-2">Lihat semua pesanan Anda</p>
                            </Link>
                            <Link href={route('profile.show')} className="p-6 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition">
                                <h3 className="text-lg font-semibold text-yellow-700">Profil Saya</h3>
                                <p className="text-sm text-yellow-600 mt-2">Kelola informasi akun Anda</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
