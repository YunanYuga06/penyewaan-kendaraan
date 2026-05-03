import { useRef, useState } from 'react';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function UpdateProfileInformationForm() {
    const user = usePage().props.auth.user;
    const penyewa = user.penyewa || {};
    const photoInput = useRef(null);
    const { data, setData, errors, processing } = useForm({
        _method: 'PUT',
        name: user.name,
        email: user.email,
        photo: null,
        nik: penyewa.nik || '',
        no_hp: penyewa.no_hp || '',
        alamat: penyewa.alamat || '',
        no_darurat: penyewa.no_darurat || '',
    });

    const [photoPreview, setPhotoPreview] = useState(null);

    const handlePhotoChange = () => {
        const file = photoInput.current?.files[0];
        if (file) {
            setData('photo', file);
            const reader = new FileReader();
            reader.onload = (e) => setPhotoPreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route('user-profile-information.update'), data, { forceFormData: true });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <InputLabel value="Photo" />
                <div className="mt-2 flex items-center gap-4">
                    {photoPreview ? (
                        <img src={photoPreview} alt="" className="w-20 h-20 rounded-full object-cover" />
                    ) : user.profile_photo_url ? (
                        <img src={user.profile_photo_url} alt="" className="w-20 h-20 rounded-full object-cover" />
                    ) : (
                        <span className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                            {user.name?.charAt(0).toUpperCase()}
                        </span>
                    )}
                    <input type="file" className="hidden" ref={photoInput} onChange={handlePhotoChange} accept="image/*" />
                    <button type="button" onClick={() => photoInput.current?.click()} className="px-3 py-2 bg-gray-100 rounded-md text-sm hover:bg-gray-200">
                        Select New Photo
                    </button>
                </div>
            </div>
            <div className="mt-4">
                <InputLabel value="Name" />
                <TextInput className="mt-1 block w-full" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                <InputError message={errors.name} className="mt-2" />
            </div>
            <div className="mt-4">
                <InputLabel value="Email" />
                <TextInput className="mt-1 block w-full" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                <InputError message={errors.email} className="mt-2" />
            </div>

            <div className="mt-6 pt-4 border-t">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Penyewa</h3>

                <div className="mt-4">
                    <InputLabel value="NIK (Nomor Induk Kependudukan)" />
                    <TextInput className="mt-1 block w-full" value={data.nik} onChange={(e) => setData('nik', e.target.value)} maxLength={16} />
                    <p className="text-xs text-gray-500 mt-1">16 digit sesuai KTP</p>
                    <InputError message={errors.nik} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel value="No. Handphone" />
                    <TextInput className="mt-1 block w-full" type="tel" value={data.no_hp} onChange={(e) => setData('no_hp', e.target.value)} maxLength={20} />
                    <InputError message={errors.no_hp} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel value="Alamat Lengkap" />
                    <textarea
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        rows={3}
                        value={data.alamat}
                        onChange={(e) => setData('alamat', e.target.value)}
                    />
                    <InputError message={errors.alamat} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel value="No. Darurat" />
                    <TextInput className="mt-1 block w-full" type="tel" value={data.no_darurat} onChange={(e) => setData('no_darurat', e.target.value)} maxLength={20} />
                    <p className="text-xs text-gray-500 mt-1">Nomor kontak darurat yang dapat dihubungi</p>
                    <InputError message={errors.no_darurat} className="mt-2" />
                </div>
            </div>

            <div className="flex items-center gap-4 mt-4">
                <PrimaryButton disabled={processing}>Save</PrimaryButton>
                {processing && <p className="text-sm text-gray-600">Saving...</p>}
            </div>
        </form>
    );
}
