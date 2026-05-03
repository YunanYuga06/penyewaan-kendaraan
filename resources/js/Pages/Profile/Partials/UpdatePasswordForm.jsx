import { useRef } from 'react';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function UpdatePasswordForm() {
    const passwordInput = useRef(null);
    const currentPasswordInput = useRef(null);

    const { data, setData, errors, put, reset, processing } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('user-password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) reset('password', 'password_confirmation');
                if (errors.current_password) reset('current_password');
                passwordInput.current?.focus();
                currentPasswordInput.current?.focus();
            },
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <InputLabel value="Current Password" />
                <TextInput className="mt-1 block w-full" type="password" value={data.current_password} onChange={(e) => setData('current_password', e.target.value)} ref={currentPasswordInput} autoComplete="current-password" />
                <InputError message={errors.current_password} className="mt-2" />
            </div>
            <div className="mt-4">
                <InputLabel value="New Password" />
                <TextInput className="mt-1 block w-full" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} ref={passwordInput} autoComplete="new-password" />
                <InputError message={errors.password} className="mt-2" />
            </div>
            <div className="mt-4">
                <InputLabel value="Confirm Password" />
                <TextInput className="mt-1 block w-full" type="password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} autoComplete="new-password" />
                <InputError message={errors.password_confirmation} className="mt-2" />
            </div>
            <div className="flex items-center gap-4 mt-4">
                <PrimaryButton disabled={processing}>Save</PrimaryButton>
                {processing && <p className="text-sm text-gray-600">Saving...</p>}
            </div>
        </form>
    );
}
