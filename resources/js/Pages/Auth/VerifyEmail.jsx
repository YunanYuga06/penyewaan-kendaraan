import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticationCard from '@/Components/AuthenticationCard';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo';
import PrimaryButton from '@/Components/PrimaryButton';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <>
            <Head title="Email Verification" />
            <AuthenticationCard>
                <div className="mb-4">
                    <AuthenticationCardLogo />
                </div>
                <div className="mb-4 text-sm text-gray-600">
                    Before continuing, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.
                </div>
                {status === 'verification-link-sent' && (
                    <div className="mb-4 font-medium text-sm text-green-600">
                        A new verification link has been sent to the email address you provided in your profile settings.
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mt-4 flex items-center justify-between">
                        <PrimaryButton disabled={processing}>Resend Verification Email</PrimaryButton>
                        <div>
                            <Link href={route('profile.show')} className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Edit Profile
                            </Link>
                            <Link href={route('logout')} method="post" as="button" className="ms-2 underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Log Out
                            </Link>
                        </div>
                    </div>
                </form>
            </AuthenticationCard>
        </>
    );
}
