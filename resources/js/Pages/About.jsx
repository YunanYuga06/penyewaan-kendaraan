import FrontendLayout from '@/Layouts/FrontendLayout';

export default function About() {
    return (
        <FrontendLayout title="Tentang SewaMobil">
            <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Tentang SewaMobil
                    </h1>
                    <p className="mt-4 text-xl text-gray-600">
                        Mitra terpercaya untuk kebutuhan transportasi Anda
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center text-gray-400">
                        Foto Tim
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Siapa Kami
                        </h2>
                        <p className="text-gray-600 mb-4">
                            SewaMobil didirikan tahun 2020 dengan misi memberikan pengalaman rental kendaraan yang mudah, aman, dan terjangkau.
                        </p>
                        <p className="text-gray-600">
                            Dengan armada 100+ kendaraan yang terawat, kami melayani ribuan pelanggan setia di seluruh Indonesia.
                        </p>
                    </div>
                </div>
            </section>
        </FrontendLayout>
    );
}