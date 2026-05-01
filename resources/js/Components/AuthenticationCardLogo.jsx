import { Link } from '@inertiajs/react';

export default function AuthenticationCardLogo() {
    return (
        <Link href={route('home')}>
            <h1 className="text-3xl font-bold text-indigo-600">SewaMobil</h1>
        </Link>
    );
}
