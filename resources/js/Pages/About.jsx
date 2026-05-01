import { Head } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';

export default function About() {
    return (
        <FrontendLayout title="Tentang Kami">
            <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900">Tentang SewaMobil</h1>
                    <p className="mt-4 text-xl text-gray-600">Mitra terpercaya untuk kebutuhan transportasi Anda</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                        <svg className="w-24 h-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Siapa Kami</h2>
                        <p className="text-gray-600 mb-4">SewaMobil didirikan tahun 2020 dengan misi memberikan pengalaman rental kendaraan yang mudah, aman, dan terjangkau.</p>
                        <p className="text-gray-600">Dengan armada 100+ kendaraan yang terawat, kami melayani ribuan pelanggan setia di seluruh Indonesia.</p>
                    </div>
                </div>
            </section>
        </FrontendLayout>
    );
}
