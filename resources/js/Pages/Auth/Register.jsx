import { Link, useForm, Head } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        no_telepon: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <>
            <Head title="Daftar Akun | Petahunan Rent Car" />

            <div className="bg-white text-slate-800 font-sans min-h-screen overflow-hidden flex">

                {/* Left Panel: Branding */}
                <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 items-center justify-center">
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1000"
                            alt="Petahunan Rent Car"
                            className="w-full h-full object-cover opacity-40"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
                    </div>
                    <div className="relative z-10 p-12 max-w-lg text-white">
                        <div className="font-extrabold text-3xl tracking-tight mb-8">
                            Petahunan<span className="text-blue-500">Rent</span>
                        </div>
                        <h1 className="text-4xl font-bold mb-4 leading-tight">
                            Perjalanan yang Nyaman Dimulai dari Sini.
                        </h1>
                        <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                            Bergabunglah dengan kami untuk menikmati kemudahan sewa mobil 24 jam dengan kalkulasi harga yang transparan dan armada yang selalu terawat.
                        </p>
                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                            <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <span className="font-medium text-sm">Data Anda dilindungi dengan enkripsi aman.</span>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Register Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 overflow-y-auto">
                    <div className="w-full max-w-md">

                        <div className="lg:hidden font-extrabold text-2xl tracking-tight mb-8 text-center">
                            Petahunan<span className="text-blue-600">Rent</span>
                        </div>

                        {/* Validation Errors */}
                        {Object.keys(errors).length > 0 && (
                            <div className="mb-4 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-sm">
                                <ul className="list-disc list-inside">
                                    {Object.values(errors).map((error, i) => (
                                        <li key={i}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Buat Akun Baru</h2>
                        <p className="text-slate-500 mb-8">Lengkapi data diri Anda untuk mulai menyewa kendaraan.</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Lengkap</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition bg-slate-50 focus:bg-white"
                                    placeholder="Sesuai KTP"
                                />
                                {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Nomor Telepon / WA</label>
                                <input
                                    type="tel"
                                    value={data.no_telepon}
                                    onChange={(e) => setData('no_telepon', e.target.value)}
                                    required
                                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition bg-slate-50 focus:bg-white"
                                    placeholder="08123456789"
                                />
                                {errors.no_telepon && <p className="text-rose-500 text-xs mt-1">{errors.no_telepon}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition bg-slate-50 focus:bg-white"
                                    placeholder="nama@email.com"
                                />
                                {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition bg-slate-50 focus:bg-white"
                                    placeholder="Minimal 8 karakter"
                                />
                                {errors.password && <p className="text-rose-500 text-xs mt-1">{errors.password}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Konfirmasi Password</label>
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition bg-slate-50 focus:bg-white"
                                    placeholder="Ulangi password"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-slate-800 transition shadow-md mt-6 disabled:opacity-60"
                            >
                                {processing ? 'Memproses...' : 'Buat Akun'}
                            </button>
                        </form>

                        <div className="mt-8 text-center text-slate-600">
                            Sudah punya akun?{' '}
                            <Link href={route('login')} className="font-bold text-blue-600 hover:text-blue-700 ml-1">
                                Masuk di sini
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}