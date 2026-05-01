import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">SewaMobil</h3>
                        <p className="text-gray-400 text-sm">Rental kendaraan terpercaya dengan harga terjangkau dan proses mudah.</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Menu</h3>
                        <ul className="space-y-1 text-gray-400 text-sm">
                            <li><Link href={route('home')} className="hover:text-white">Beranda</Link></li>
                            <li><Link href={route('catalog.index')} className="hover:text-white">Katalog</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Kontak</h3>
                        <p className="text-gray-400 text-sm">Email: info@sewamobil.com</p>
                        <p className="text-gray-400 text-sm">Telepon: +62 812-3456-7890</p>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-6 pt-6 text-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} SewaMobil. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
