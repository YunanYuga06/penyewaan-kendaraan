import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';

export default function EditProfile({ auth }) {
    const currentRoute = usePage().component;
    const penyewa = auth?.penyewa || {};

    const { data, setData, post, processing, errors } = useForm({
        name: auth?.user?.name || '',
        nik: penyewa.nik || '',
        no_hp: penyewa.no_hp || '',
        alamat: penyewa.alamat || '',
        no_darurat: penyewa.no_darurat || '',
    });

    const handleLogout = () => {
        router.post(route('logout'));
    };

    const isActive = (routeName) => currentRoute === routeName;

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('profile.update'));
    };

    return (
        <FrontendLayout title="Pengaturan Profil - SewaMobil">
            <Head title="Pengaturan Profil - SewaMobil" />

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
                            <Link href={route('profile.dashboard')} className={`block w-full text-left px-3 py-2 rounded font-medium ${isActive('Profile/UserDashboard') ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                                Dashboard
                            </Link>
                            <Link href={route('profile.history')} className={`block w-full text-left px-3 py-2 rounded font-medium ${isActive('Profile/History') ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                                Riwayat Pesanan
                            </Link>
                            <Link href={route('profile.edit')} className={`block w-full text-left px-3 py-2 rounded font-medium ${isActive('Profile/Edit') ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                                Pengaturan
                            </Link>
                            <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded text-red-600 hover:bg-red-50">
                                Keluar
                            </button>
                        </nav>
                    </div>

                    <div className="lg:col-span-3">
                        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold mb-6 text-gray-900">Pengaturan Profil</h2>

                            {usePage().props.message && (
                                <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">{usePage().props.message}</div>
                            )}
                            {errors.error && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{errors.error}</div>
                            )}

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">NIK (Nomor Induk Kependudukan)</label>
                                    <input
                                        type="text"
                                        value={data.nik}
                                        onChange={(e) => setData('nik', e.target.value)}
                                        maxLength={16}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="16 digit sesuai KTP"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Wajib diisi untuk verifikasi penyewa</p>
                                    {errors.nik && <p className="mt-1 text-sm text-red-600">{errors.nik}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">No. Handphone</label>
                                    <input
                                        type="tel"
                                        value={data.no_hp}
                                        onChange={(e) => setData('no_hp', e.target.value)}
                                        maxLength={20}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="08xxxxxxxxxx"
                                    />
                                    {errors.no_hp && <p className="mt-1 text-sm text-red-600">{errors.no_hp}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                                    <textarea
                                        value={data.alamat}
                                        onChange={(e) => setData('alamat', e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Masukkan alamat lengkap sesuai KTP"
                                    />
                                    {errors.alamat && <p className="mt-1 text-sm text-red-600">{errors.alamat}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">No. Darurat</label>
                                    <input
                                        type="tel"
                                        value={data.no_darurat}
                                        onChange={(e) => setData('no_darurat', e.target.value)}
                                        maxLength={20}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Nomor kontak darurat"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Nomor yang dapat dihubungi dalam keadaan darurat</p>
                                    {errors.no_darurat && <p className="mt-1 text-sm text-red-600">{errors.no_darurat}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="mt-6 w-full px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </FrontendLayout>
    );
}