import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useState } from 'react';

export default function LogoutOtherBrowserSessionsForm({ sessions }) {
    const [confirmingLogout, setConfirmingLogout] = useState(false);
    const { data, setData, delete: destroy, processing, reset, errors } = useForm({ password: '' });

    const confirmLogout = () => setConfirmingLogout(true);

    const logoutOthers = (e) => {
        e.preventDefault();
        destroy(route('other-browser-sessions.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => document.getElementById('password')?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingLogout(false);
        reset();
    };

    return (
        <section>
            <h3 className="text-lg font-medium text-gray-900">Browser Sessions</h3>
            <p className="mt-1 text-sm text-gray-600">Manage and log out your active sessions on other browsers and devices.</p>
            <button type="button" onClick={confirmLogout} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                Log Out Other Browser Sessions
            </button>
            {confirmingLogout && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-medium text-gray-900">Log Out Other Browser Sessions</h3>
                        <p className="mt-1 text-sm text-gray-600">Please enter your password to confirm.</p>
                        <form onSubmit={logoutOthers} className="mt-4">
                            <InputLabel value="Password" />
                            <TextInput id="password" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.password} className="mt-2" />
                            <div className="mt-4 flex justify-end gap-3">
                                <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Cancel</button>
                                <PrimaryButton disabled={processing}>Log Out Other Sessions</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}
