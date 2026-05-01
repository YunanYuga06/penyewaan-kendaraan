import { Head, useForm } from '@inertiajs/react';
import AuthenticationCard from '@/Components/AuthenticationCard';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Confirm Password" />
            <AuthenticationCard>
                <div className="mb-4">
                    <AuthenticationCardLogo />
                </div>
                <div className="mb-4 text-sm text-gray-600">
                    This is a secure area of the application. Please confirm your password before continuing.
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <InputLabel htmlFor="password" value="Password" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                            isFocused={true}
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>
                    <div className="flex justify-end mt-4">
                        <PrimaryButton disabled={processing}>Confirm</PrimaryButton>
                    </div>
                </form>
            </AuthenticationCard>
        </>
    );
}
