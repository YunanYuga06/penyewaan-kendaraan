import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    useEffect(() => () => reset('password'), []);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <>
            <Head title="Masuk" />
            <section className="min-h-screen flex">
                {/* Left Panel - Branding */}
                <div className="hidden lg:flex lg:w-1/2 bg-indigo-600 items-center justify-center p-12">
                    <div className="text-white">
                        <h1 className="text-4xl font-bold mb-4">Selamat Datang di SewaMobil</h1>
                        <p className="text-indigo-200 text-lg">Platform rental kendaraan terpercaya dengan ribuan armada siap menemani perjalanan Anda.</p>
                    </div>
                </div>
                {/* Right Panel - Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
                    <div className="max-w-md w-full">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Masuk ke Akun</h2>
                        <p className="text-gray-500 mb-6">Belum punya akun? <Link href={route('register')} className="text-indigo-600 font-medium hover:underline">Daftar sekarang</Link></p>
                        {status && <div className="mb-4 text-sm text-green-600">{status}</div>}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <InputLabel htmlFor="email" value="Email" />
                                <TextInput id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="mt-1 block w-full" autoComplete="username" isFocused />
                                <InputError message={errors.email} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="password" value="Password" />
                                <TextInput id="password" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} className="mt-1 block w-full" autoComplete="current-password" />
                                <InputError message={errors.password} className="mt-2" />
                            </div>
                            {canResetPassword && <Link href={route('password.request')} className="text-sm text-indigo-600 hover:underline">Lupa password?</Link>}
                            <PrimaryButton className="w-full flex justify-center py-3" disabled={processing}>Masuk</PrimaryButton>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
