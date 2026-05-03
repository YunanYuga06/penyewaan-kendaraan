import { Link, usePage, Head } from '@inertiajs/react';

export default function FrontendLayout({ children, title }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <>
            <Head title={title ?? "SewaMobil - Rental Kendaraan Terpercaya"} />

            <div className="bg-gray-50 text-gray-900 font-sans flex flex-col min-h-screen">
                {/* Navbar */}
                <nav className="bg-white shadow-sm sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 items-center">
                            <div className="flex items-center">
                                <Link href={route('home')} className="text-2xl font-bold text-indigo-600">
                                    SewaMobil
                                </Link>
                                <div className="hidden md:flex ml-10 space-x-8">
                                    <Link href={route('home')} className="text-gray-900 font-medium">
                                        Beranda
                                    </Link>
                                    <Link href={route('catalog.index')} className="text-gray-500 hover:text-gray-900">
                                        Katalog
                                    </Link>
                                    <Link href={route('about')} className="text-gray-500 hover:text-gray-900">
                                        Tentang Kami
                                    </Link>
                                    <Link href={route('contact')} className="text-gray-500 hover:text-gray-900">
                                        Kontak
                                    </Link>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                {user ? (
                                    user.role === 'admin' ? (
                                        <Link href={route('admin.dashboard')} className="text-gray-500 hover:text-gray-900 font-medium">
                                            Admin Panel
                                        </Link>
                                    ) : (
                                        <Link href={route('profile.dashboard')} className="text-gray-500 hover:text-gray-900 font-medium">
                                            Akun Saya
                                        </Link>
                                    )
                                ) : (
                                    <>
                                        <Link href={route('login')} className="text-gray-500 hover:text-gray-900 font-medium">
                                            Masuk
                                        </Link>
                                        <Link href={route('register')} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                                            Daftar
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Content */}
                <main className="flex-grow pt-16">{children}</main>

                {/* Footer */}
                <footer className="bg-gray-800 text-white mt-16">
                    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div>
                                <h3 className="text-xl font-bold text-indigo-400 mb-4">SewaMobil</h3>
                                <p className="text-gray-300 text-sm">Rental kendaraan terpercaya dengan armada terbaik dan harga terjangkau.</p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4">Menu</h4>
                                <ul className="space-y-2 text-sm text-gray-300">
                                    <li><Link href={route('home')} className="hover:text-white">Beranda</Link></li>
                                    <li><Link href={route('catalog.index')} className="hover:text-white">Katalog</Link></li>
                                    <li><Link href={route('about')} className="hover:text-white">Tentang Kami</Link></li>
                                    <li><Link href={route('contact')} className="hover:text-white">Kontak</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4">Layanan</h4>
                                <ul className="space-y-2 text-sm text-gray-300">
                                    <li>Sewa Harian</li>
                                    <li>Sewa Mingguan</li>
                                    <li>Sewa Bulanan</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4">Kontak</h4>
                                <ul className="space-y-2 text-sm text-gray-300">
                                    <li>Jl. Sudirman No. 123</li>
                                    <li>+62 812-3456-7890</li>
                                    <li>info@sewamobil.com</li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
                            <p>&copy; {new Date().getFullYear()} SewaMobil. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
