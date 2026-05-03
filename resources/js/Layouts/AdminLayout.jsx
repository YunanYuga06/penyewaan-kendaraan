import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminLayout({ title, children }) {
    const { auth } = usePage().props;
    const [showingNav, setShowNav] = useState(false);

    const navClass = (name) => route().current(name)
        ? 'inline-flex items-center px-1 pt-1 border-b-2 border-white text-sm font-medium text-white'
        : 'inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-indigo-200 hover:text-white';

    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-gray-100">
                <nav className="bg-indigo-800 border-b border-indigo-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="shrink-0 flex items-center">
                                    <Link href={route('admin.dashboard')} className="text-xl font-bold text-white">Admin Panel</Link>
                                </div>
                                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                    <Link href={route('admin.dashboard')} className={navClass('admin.dashboard')}>Dashboard</Link>
                                    <Link href={route('admin.kendaraan.index')} className={navClass('admin.kendaraan.index')}>Kendaraan</Link>
                                    <Link href={route('admin.pemesanan.index')} className={navClass('admin.pemesanan.index')}>Pemesanan</Link>
                                    <Link href={route('admin.pembayaran.index')} className={navClass('admin.pembayaran.index')}>Pembayaran</Link>
                                </div>
                            </div>
                            <div className="hidden sm:flex sm:items-center sm:ms-6">
                                <div className="ms-3 relative">
                                    <button type="button" className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-700 hover:bg-indigo-600 transition" onClick={() => setShowNav(!showingNav)}>
                                        {auth.user.name}
                                        <svg className="ms-2 -me-0.5 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                        </svg>
                                    </button>
                                    {showingNav && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                            <Link href={route('profile.show')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                                            <Link href={route('logout')} method="post" as="button" className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Log Out</Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <main>{children}</main>
            </div>
        </>
    );
}
