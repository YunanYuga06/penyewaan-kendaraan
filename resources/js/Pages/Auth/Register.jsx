import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        terms: false,
    });

    useEffect(() => () => reset('password', 'password_confirmation'), []);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <>
            <Head title="Daftar" />
            <section className="min-h-screen flex">
                {/* Left Panel - Branding */}
                <div className="hidden lg:flex lg:w-1/2 bg-indigo-600 items-center justify-center p-12">
                    <div className="text-white">
                        <h1 className="text-4xl font-bold mb-4">Bergabung dengan SewaMobil</h1>
                        <p className="text-indigo-200 text-lg">Daftar gratis dan mulai sewa kendaraan favorit Anda dalam hitungan menit.</p>
                    </div>
                </div>
                {/* Right Panel - Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
                    <div className="max-w-md w-full">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Buat Akun Baru</h2>
                        <p className="text-gray-500 mb-6">Sudah punya akun? <Link href={route('login')} className="text-indigo-600 font-medium hover:underline">Masuk</Link></p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <InputLabel htmlFor="name" value="Nama Lengkap" />
                                <TextInput id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="mt-1 block w-full" autoComplete="name" isFocused required />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="email" value="Email" />
                                <TextInput id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="mt-1 block w-full" autoComplete="username" required />
                                <InputError message={errors.email} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="password" value="Password" />
                                <TextInput id="password" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} className="mt-1 block w-full" autoComplete="new-password" required />
                                <InputError message={errors.password} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="password_confirmation" value="Konfirmasi Password" />
                                <TextInput id="password_confirmation" type="password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} className="mt-1 block w-full" autoComplete="new-password" required />
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>
                            <div>
                                <label className="flex items-center">
                                    <Checkbox checked={data.terms} onChange={(e) => setData('terms', e.target.checked)} />
                                    <span className="ms-2 text-sm text-gray-600">Saya setuju dengan <Link href={route('terms.show')} className="text-indigo-600 hover:underline">Syarat & Ketentuan</Link> dan <Link href={route('policy.show')} className="text-indigo-600 hover:underline">Kebijakan Privasi</Link></span>
                                </label>
                                <InputError message={errors.terms} className="mt-2" />
                            </div>
                            <PrimaryButton className="w-full flex justify-center py-3" disabled={processing}>Daftar</PrimaryButton>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
