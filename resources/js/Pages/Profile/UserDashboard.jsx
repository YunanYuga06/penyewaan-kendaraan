import { Head, Link, router, usePage } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';

export default function UserDashboard({ auth, bookings = [], stats = {} }) {
    const currentRoute = usePage().component;

    const handleLogout = () => {
        router.post(route('logout'));
    };

    const isActive = (routeName) => currentRoute === routeName;

    return (
        <FrontendLayout title="Akun Saya - SewaMobil">
            <Head title="Akun Saya - SewaMobil" />

            <section className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Akun Saya</h1>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-2xl font-bold">
                                {auth?.user?.name?.charAt(0).toUpperCase() ?? 'U'}
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">{auth?.user?.name ?? 'User Name'}</p>
                                <p className="text-sm text-gray-500">{auth?.user?.email ?? 'user@email.com'}</p>
                            </div>
                        </div>
                        <nav className="space-y-2">
                            <Link
                                href={route('profile.dashboard')}
                                className={`block w-full text-left px-3 py-2 rounded font-medium ${
                                    isActive('Profile/UserDashboard')
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                Dashboard
                            </Link>
                            <Link
                                href={route('profile.history')}
                                className={`block w-full text-left px-3 py-2 rounded font-medium ${
                                    isActive('Profile/History')
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                Riwayat Pesanan
                            </Link>
                            <Link
                                href={route('profile.edit')}
                                className={`block w-full text-left px-3 py-2 rounded font-medium ${
                                    isActive('Profile/Edit')
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                Pengaturan
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-3 py-2 rounded text-red-600 hover:bg-red-50"
                            >
                                Keluar
                            </button>
                        </nav>
                    </div>

                    <div className="lg:col-span-3 space-y-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold mb-4 text-gray-900">Statistik</h2>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-blue-50 p-4 rounded">
                                    <p className="text-sm text-gray-500">Total Pesanan</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.total ?? 0}</p>
                                </div>
                                <div className="bg-green-50 p-4 rounded">
                                    <p className="text-sm text-gray-500">Selesai</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.selesai ?? 0}</p>
                                </div>
                                <div className="bg-yellow-50 p-4 rounded">
                                    <p className="text-sm text-gray-500">Aktif</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.aktif ?? 0}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold mb-4 text-gray-900">Pesanan Terbaru</h2>
                            <div className="space-y-3">
                                {bookings.length === 0 ? (
                                    <p className="text-gray-500 text-center py-8">Belum ada pesanan</p>
                                ) : (
                                    bookings.slice(0, 5).map((booking) => (
                                        <div key={booking.id} className="border rounded-lg p-4 flex justify-between items-center">
                                            <div>
                                                <p className="font-semibold text-gray-900">{booking.kendaraan?.merk}</p>
                                                <p className="text-sm text-gray-500">
                                                    {new Date(booking.tgl_sewa).toLocaleDateString('id-ID')} • {booking.total_biaya.toLocaleString('id-ID')}
                                                </p>
                                            </div>
                                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                                                booking.status_pesanan === 'Dikonfirmasi' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                                {booking.status_pesanan}
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </FrontendLayout>
    );
}