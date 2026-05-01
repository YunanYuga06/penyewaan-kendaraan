import { useState } from 'react';

export default function UploadForm({ label, accept = 'image/*,.pdf', maxMb = 2, onChange, error, hint }) {
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > maxMb * 1024 * 1024) {
                alert(`Ukuran file melebihi ${maxMb}MB`);
                return;
            }
            if (file.type.startsWith('image/')) {
                setPreview(URL.createObjectURL(file));
            } else {
                setPreview(null);
            }
            onChange(file);
        }
    };

    return (
        <div>
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
            <div className="flex items-center gap-4">
                <input
                    type="file"
                    accept={accept}
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
                {preview && (
                    <img src={preview} alt="Preview" className="w-16 h-16 object-cover rounded-md border" />
                )}
            </div>
            {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}
