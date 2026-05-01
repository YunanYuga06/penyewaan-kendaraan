import { Head, Link } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';

export default function Home() {
    return (
        <FrontendLayout>
            <Head title="Beranda | Petahunan Rent" />

            {/* START: Hero Section */}
            <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="w-full lg:w-1/2 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-primary text-sm font-semibold mb-6">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                Booking Mandiri 24/7 Kini Tersedia
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                                Perjalanan Nyaman,<br />
                                <span className="text-primary">Tanpa Ribet.</span>
                            </h1>
                            <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                Sewa mobil di Petahunan, Banyumas kini lebih mudah. Pilih armada, bayar DP, dan nikmati perjalanan Anda dengan kendaraan yang selalu dalam kondisi prima.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                {/* Menggunakan Inertia Link agar navigasi ke katalog terasa instan (SPA) */}
                                <Link href={route('catalog')} className="bg-primary text-white px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-primaryHover transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                                    Pilih Mobil Sekarang
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                    </svg>
                                </Link>
                                <a href="#keunggulan" className="bg-white text-slate-700 border border-slate-200 px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-slate-50 transition flex items-center justify-center">
                                    Cara Booking
                                </a>
                            </div>
                        </div>

                        {/* Hero Image & Floating Badge */}
                        <div className="w-full lg:w-1/2 relative">
                            <div className="relative w-full aspect-[4/3] lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                                <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1000" alt="Rental Mobil Petahunan" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                            </div>
                            {/* Floating Badge */}
                            <div className="absolute -bottom-6 -left-6 lg:bottom-10 lg:-left-10 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
                                <div className="bg-emerald-100 p-3 rounded-full text-emerald-600">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 font-medium">GPS Tracking</p>
                                    <p className="text-slate-900 font-bold">100% Aman</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            {/* END: Hero Section */}

            {/* START: Features Section */}
            <section id="keunggulan" className="py-20 bg-white border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Mengapa Memilih Petahunan Rent?</h2>
                        <p className="text-slate-500 text-lg">Kami bertransformasi dari sistem manual menjadi platform digital untuk memberikan pelayanan yang lebih cepat, tepat, dan responsif kepada Anda.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">
                        {/* Feature 1 */}
                        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition">
                            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-primary mb-6">
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Booking Mandiri 24 Jam</h3>
                            <p className="text-slate-600 leading-relaxed">Selesaikan seluruh alur pemesanan secara mandiri dari layar ponsel Anda dalam hitungan menit. Tanpa perlu antre membalas pesan admin.</p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition">
                            <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 mb-6">
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Armada Selalu Prima</h3>
                            <p className="text-slate-600 leading-relaxed">Sistem kami memantau perawatan rutin secara otomatis, memastikan armada yang Anda sewa terhindar dari kendala teknis.</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition">
                            <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-6">
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Transparansi Biaya</h3>
                            <p className="text-slate-600 leading-relaxed">Hitung total sewa, DP 25%, dan biaya layanan tambahan secara transparan langsung di website. Tidak ada biaya tersembunyi.</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* END: Features Section */}

        </FrontendLayout>
    );
}