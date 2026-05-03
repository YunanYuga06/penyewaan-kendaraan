import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function DeleteUserForm() {
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const { data, setData, delete: destroy, processing, reset, errors } = useForm({ password: '' });

    const confirmDeletion = () => setConfirmingDeletion(true);

    const deleteUser = (e) => {
        e.preventDefault();
        destroy(route('current-user.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => document.getElementById('password-delete')?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingDeletion(false);
        reset();
    };

    return (
        <section>
            <h3 className="text-lg font-medium text-red-600">Delete Account</h3>
            <p className="mt-1 text-sm text-gray-600">Once your account is deleted, all of its resources and data will be permanently deleted.</p>
            <button type="button" onClick={confirmDeletion} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                Delete Account
            </button>
            {confirmingDeletion && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-medium text-gray-900">Are you sure you want to delete your account?</h3>
                        <p className="mt-1 text-sm text-gray-600">This action cannot be undone. Enter your password to confirm.</p>
                        <form onSubmit={deleteUser} className="mt-4">
                            <InputLabel value="Password" />
                            <TextInput id="password-delete" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.password} className="mt-2" />
                            <div className="mt-4 flex justify-end gap-3">
                                <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Cancel</button>
                                <button type="submit" disabled={processing} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50">
                                    Delete Account
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}
