import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function FrontendLayout({ title, children }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-gray-50 flex flex-col">
                {/* Navbar */}
                <nav className="bg-white shadow-sm sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 items-center">
                            <div className="flex items-center">
                                <Link href={route('home')} className="text-2xl font-bold text-indigo-600">
                                    SewaMobil
                                </Link>
                                <div className="hidden md:flex ml-10 space-x-8">
                                    <Link href={route('home')} className={route().current('home') ? 'text-gray-900 font-medium' : 'text-gray-500 hover:text-gray-900'}>
                                        Beranda
                                    </Link>
                                    <Link href={route('catalog.index')} className={route().current('catalog.index') ? 'text-gray-900 font-medium' : 'text-gray-500 hover:text-gray-900'}>
                                        Katalog
                                    </Link>
                                    <Link href={route('about')} className={route().current('about') ? 'text-gray-900 font-medium' : 'text-gray-500 hover:text-gray-900'}>
                                        Tentang Kami
                                    </Link>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                {user ? (
                                    <>
                                        {user.role === 'admin' ? (
                                            <Link href={route('admin.dashboard')} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm font-medium">
                                                Dashboard Admin
                                            </Link>
                                        ) : (
                                            <Link href={route('profile.dashboard')} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm font-medium">
                                                Akun Saya
                                            </Link>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <Link href={route('login')} className="text-gray-500 hover:text-gray-900 font-medium">
                                            Masuk
                                        </Link>
                                        <Link href={route('register')} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm">
                                            Daftar
                                        </Link>
                                    </>
                                )}
                                {/* Mobile menu button */}
                                <button className="md:hidden ml-2 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path className={mobileMenuOpen ? 'hidden' : 'block'} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                        <path className={mobileMenuOpen ? 'block' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Mobile menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden border-t border-gray-100 py-2">
                            <Link href={route('home')} className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Beranda</Link>
                            <Link href={route('catalog.index')} className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Katalog</Link>
                            <Link href={route('about')} className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Tentang Kami</Link>
                            {user ? (
                                <Link href={user.role === 'admin' ? route('admin.dashboard') : route('profile.dashboard')} className="block px-4 py-2 text-indigo-600 hover:bg-gray-50 font-medium">
                                    {user.role === 'admin' ? 'Dashboard Admin' : 'Akun Saya'}
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Masuk</Link>
                                    <Link href={route('register')} className="block px-4 py-2 text-indigo-600 hover:bg-gray-50">Daftar</Link>
                                </>
                            )}
                        </div>
                    )}
                </nav>

                {/* Page Content */}
                <main className="flex-grow">{children}</main>

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
