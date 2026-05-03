import { useEffect, useRef, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticationCard from '@/Components/AuthenticationCard';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function TwoFactorChallenge({ recovery = false }) {
    const [recoveryMode, setRecoveryMode] = useState(recovery);
    const { data, setData, post, processing, errors, reset } = useForm({
        code: '',
        recovery_code: '',
    });

    const recoveryCodeRef = useRef(null);
    const codeRef = useRef(null);

    useEffect(() => {
        if (recoveryMode) {
            recoveryCodeRef.current?.focus();
        } else {
            codeRef.current?.focus();
        }
    }, [recoveryMode]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('two-factor.login'));
    };

    const toggleRecovery = async (e) => {
        e.preventDefault();
        setRecoveryMode((prev) => !prev);
        await new Promise((resolve) => setTimeout(resolve, 100));
        reset('code', 'recovery_code');
        if (recoveryMode) {
            codeRef.current?.focus();
        } else {
            recoveryCodeRef.current?.focus();
        }
    };

    return (
        <>
            <Head title="Two-factor Confirmation" />
            <AuthenticationCard>
                <div className="mb-4">
                    <AuthenticationCardLogo />
                </div>
                <div className="mb-4 text-sm text-gray-600">
                    {recoveryMode
                        ? 'Please confirm access by entering the recovery code provided during two-factor authentication setup.'
                        : 'Please confirm access by entering the authentication code provided by your authenticator application.'}
                </div>
                <form onSubmit={handleSubmit}>
                    {recoveryMode ? (
                        <div>
                            <InputLabel htmlFor="recovery_code" value="Recovery Code" />
                            <TextInput
                                id="recovery_code"
                                name="recovery_code"
                                value={data.recovery_code}
                                className="mt-1 block w-full"
                                autoComplete="one-time-code"
                                onChange={(e) => setData('recovery_code', e.target.value)}
                                ref={recoveryCodeRef}
                            />
                            <InputError message={errors.recovery_code} className="mt-2" />
                        </div>
                    ) : (
                        <div>
                            <InputLabel htmlFor="code" value="Code" />
                            <TextInput
                                id="code"
                                name="code"
                                value={data.code}
                                className="mt-1 block w-full"
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                onChange={(e) => setData('code', e.target.value)}
                                ref={codeRef}
                            />
                            <InputError message={errors.code} className="mt-2" />
                        </div>
                    )}
                    <div className="flex items-center justify-between mt-4">
                        <button type="button" onClick={toggleRecovery} className="text-sm text-gray-600 hover:text-gray-900 underline">
                            {recoveryMode ? 'Use an authentication code' : 'Use a recovery code'}
                        </button>
                        <PrimaryButton disabled={processing}>Log in</PrimaryButton>
                    </div>
                </form>
            </AuthenticationCard>
        </>
    );
}
