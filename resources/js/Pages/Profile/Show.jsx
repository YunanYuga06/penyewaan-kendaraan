import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import LogoutOtherBrowserSessionsForm from './Partials/LogoutOtherBrowserSessionsForm';
import TwoFactorAuthenticationForm from './Partials/TwoFactorAuthenticationForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Show({ confirmsTwoFactorAuthentication, sessions }) {
    return (
        <AppLayout title="Profile">
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateProfileInformationForm />
                    </div>
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm />
                    </div>
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <TwoFactorAuthenticationForm confirmsTwoFactorAuthentication={confirmsTwoFactorAuthentication} />
                    </div>
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <LogoutOtherBrowserSessionsForm sessions={sessions} />
                    </div>
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
