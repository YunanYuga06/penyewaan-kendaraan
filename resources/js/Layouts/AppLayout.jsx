import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AppLayout({ title, children }) {
    const { auth } = usePage().props;
    const [showingNav, setShowNav] = useState(false);

    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-gray-100">
                <nav className="bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="shrink-0 flex items-center">
                                    <Link href={route('dashboard')} className="text-xl font-bold text-indigo-600">
                                        SewaMobil
                                    </Link>
                                </div>
                                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                    <Link href={route('dashboard')} className={route().current('dashboard') ? 'inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400 text-sm font-medium text-gray-900' : 'inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700'}>
                                        Dashboard
                                    </Link>
                                    <Link href={route('dashboard.riwayat')} className={route().current('dashboard.riwayat') ? 'inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400 text-sm font-medium text-gray-900' : 'inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700'}>
                                        Riwayat Pesanan
                                    </Link>
                                </div>
                            </div>
                            <div className="hidden sm:flex sm:items-center sm:ms-6">
                                <div className="ms-3 relative">
                                    <button type="button" className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 transition" onClick={() => setShowNav(!showingNav)}>
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
                            <div className="-me-2 flex items-center sm:hidden">
                                <button onClick={() => setShowNav(!showingNav)} className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path className={!showingNav ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                        <path className={showingNav ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    {showingNav && (
                        <div className="sm:hidden">
                            <div className="pt-2 pb-3 space-y-1">
                                <Link href={route('dashboard')} className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50">Dashboard</Link>
                                <Link href={route('dashboard.riwayat')} className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50">Riwayat Pesanan</Link>
                            </div>
                            <div className="pt-4 pb-1 border-t border-gray-200">
                                <div className="px-4">
                                    <div className="font-medium text-base text-gray-800">{auth.user.name}</div>
                                    <div className="font-medium text-sm text-gray-500">{auth.user.email}</div>
                                </div>
                                <div className="mt-3 space-y-1">
                                    <Link href={route('logout')} method="post" as="button" className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">Log Out</Link>
                                </div>
                            </div>
                        </div>
                    )}
                </nav>
                <main>{children}</main>
            </div>
        </>
    );
}
