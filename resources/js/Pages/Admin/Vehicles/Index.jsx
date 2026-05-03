import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminVehiclesIndex({ vehicles = [], message = null }) {
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedVehicleId, setSelectedVehicleId] = useState(null);
    const [previewPhotos, setPreviewPhotos] = useState([]);

    const { data, setData, post, processing, errors, reset, transform } = useForm({
        plat_nomor: '',
        merk: '',
        jenis: '',
        status: 'Tersedia',
        harga_sewa_per_hari: '',
        photos: [],
    });

    transform((data) => ({
        ...data,
        photos: data.photos.filter((photo) => photo instanceof File),
    }));

    const handleEdit = (vehicle) => {
        setIsEditMode(true);
        setSelectedVehicleId(vehicle.id);
        setData({
            plat_nomor: vehicle.plat_nomor,
            merk: vehicle.merk,
            jenis: vehicle.jenis || '',
            status: vehicle.status || 'Tersedia',
            harga_sewa_per_hari: vehicle.harga_sewa_per_hari || '',
            photos: [],
        });
        setPreviewPhotos([]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setIsEditMode(false);
        setSelectedVehicleId(null);
        reset();
        setPreviewPhotos([]);
    };

    const handlePhotoChange = (e) => {
        const files = Array.from(e.target.files || []);
        setData('photos', files);
        const previews = files.map(file => URL.createObjectURL(file));
        setPreviewPhotos(previews);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditMode) {
            router.post(route('admin.kendaraan.update', selectedVehicleId), {
                _method: 'put',
                plat_nomor: data.plat_nomor,
                merk: data.merk,
                jenis: data.jenis,
                status: data.status,
                harga_sewa_per_hari: data.harga_sewa_per_hari,
                photos: data.photos,
            }, {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    handleCancelEdit();
                },
                onError: (errors) => {
                    console.log('Validation errors:', errors);
                },
            });
        } else {
            post(route('admin.kendaraan.store'), {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    setPreviewPhotos([]);
                },
                onError: (errors) => {
                    console.log('Validation errors:', errors);
                },
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus kendaraan ini secara permanen?')) {
            router.delete(route('admin.kendaraan.destroy', id));
        }
    };

    const getStatusBadgeClass = (status) => {
        switch(status) {
            case 'Tersedia':
                return 'bg-emerald-100 text-emerald-700';
            case 'Disewa':
                return 'bg-rose-100 text-rose-700';
            case 'Maintenance':
                return 'bg-amber-100 text-amber-700';
            default:
                return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <AdminLayout title="Manajemen Armada">
            <Head title="Manajemen Armada - SewaMobil" />

            <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Manajemen Armada</h1>
                        <p className="text-slate-500 text-sm">Kelola data kendaraan dan galeri foto</p>
                    </div>
                </div>

                {/* Success Message */}
                {message && (
                    <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl mb-6 border border-emerald-200 flex items-center gap-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="font-medium">{message}</span>
                    </div>
                )}

                {/* Validation Errors */}
                {Object.keys(errors).length > 0 && (
                    <div className="bg-rose-50 text-rose-700 p-4 rounded-xl mb-6 border border-rose-200">
                        <p className="font-medium mb-1">Terjadi kesalahan:</p>
                        <ul className="list-disc list-inside text-sm">
                            {Object.values(errors).map((error, idx) => (
                                <li key={idx}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Two-Column Layout */}
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Left Column: Form */}
                    <div className="w-full lg:w-1/3">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm sticky top-24">
                            <h2 className="font-bold text-lg mb-4 border-b pb-2">
                                {isEditMode ? 'Edit Armada' : 'Tambah Armada Baru'}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Plat Nomor */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Plat Nomor</label>
                                    <input
                                        type="text"
                                        value={data.plat_nomor}
                                        onChange={(e) => setData('plat_nomor', e.target.value)}
                                        className="w-full border-slate-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500/50 text-sm p-2.5 border"
                                        placeholder="Contoh: R 1234 AB"
                                    />
                                    {errors.plat_nomor && <span className="text-rose-500 text-xs mt-1">{errors.plat_nomor}</span>}
                                </div>

                                {/* Merk */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Merk Kendaraan</label>
                                    <input
                                        type="text"
                                        value={data.merk}
                                        onChange={(e) => setData('merk', e.target.value)}
                                        className="w-full border-slate-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500/50 text-sm p-2.5 border"
                                        placeholder="Contoh: Toyota Avanza"
                                    />
                                    {errors.merk && <span className="text-rose-500 text-xs mt-1">{errors.merk}</span>}
                                </div>

                                {/* Jenis & Status (Grid) */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Jenis</label>
                                        <select
                                            value={data.jenis}
                                            onChange={(e) => setData('jenis', e.target.value)}
                                            className="w-full border-slate-300 rounded-lg shadow-sm focus:border-blue-500 text-sm p-2.5 border"
                                        >
                                            <option value="">Pilih...</option>
                                            <option value="MPV">MPV</option>
                                            <option value="SUV">SUV</option>
                                            <option value="City Car">City Car</option>
                                        </select>
                                        {errors.jenis && <span className="text-rose-500 text-xs mt-1">{errors.jenis}</span>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                                        <select
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className="w-full border-slate-300 rounded-lg shadow-sm focus:border-blue-500 text-sm p-2.5 border"
                                        >
                                            <option value="Tersedia">Tersedia</option>
                                            <option value="Disewa">Disewa</option>
                                            <option value="Maintenance">Maintenance</option>
                                        </select>
                                        {errors.status && <span className="text-rose-500 text-xs mt-1">{errors.status}</span>}
                                    </div>
                                </div>

                                {/* Harga */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Harga Sewa / Hari (Rp)</label>
                                    <input
                                        type="number"
                                        value={data.harga_sewa_per_hari}
                                        onChange={(e) => setData('harga_sewa_per_hari', e.target.value)}
                                        className="w-full border-slate-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500/50 text-sm p-2.5 border"
                                        placeholder="Contoh: 350000"
                                    />
                                    {errors.harga_sewa_per_hari && <span className="text-rose-500 text-xs mt-1">{errors.harga_sewa_per_hari}</span>}
                                </div>

                                {/* Photo Upload */}
                                <div className="pt-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        {isEditMode ? 'Tambah Foto Baru' : 'Unggah Galeri Foto'}
                                    </label>
                                    <input
                                        type="file"
                                        multiple
                                        onChange={handlePhotoChange}
                                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500/10 file:text-blue-600 hover:file:bg-blue-500/20 transition cursor-pointer"
                                    />

                                    {/* Preview Photos */}
                                    {previewPhotos.length > 0 && (
                                        <div className="mt-3">
                                            <p className="text-[10px] font-bold text-blue-600 uppercase mb-2">Siap Diunggah:</p>
                                            <div className="flex gap-2 overflow-x-auto pb-2">
                                                {previewPhotos.map((preview, idx) => (
                                                    <img
                                                        key={idx}
                                                        src={preview}
                                                        className="h-16 w-16 object-cover rounded-lg border-2 border-blue-500 shrink-0"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2 pt-4 border-t border-slate-100">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition flex justify-center items-center disabled:opacity-50 disabled:bg-blue-400"
                                    >
                                        {processing ? 'Menyimpan...' : (isEditMode ? 'Simpan Perubahan' : 'Simpan Armada')}
                                    </button>
                                    {isEditMode && (
                                        <button
                                            type="button"
                                            onClick={handleCancelEdit}
                                            className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition"
                                        >
                                            Batal
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right Column: Table */}
                    <div className="w-full lg:w-2/3">
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-4">Kendaraan</th>
                                        <th className="px-6 py-4">Tarif & Status</th>
                                        <th className="px-6 py-4 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {vehicles.length === 0 ? (
                                        <tr>
                                            <td colSpan="3" className="px-6 py-8 text-center text-slate-400">
                                                Belum ada data armada mobil. Silakan tambah melalui formulir di samping.
                                            </td>
                                        </tr>
                                    ) : (
                                        (vehicles?.data || vehicles || []).map((vehicle) =>  (
                                            <tr key={vehicle.id} className="hover:bg-slate-50 transition">
                                                <td className="px-6 py-4 flex items-center gap-4">
                                                    {/* Vehicle Photo */}
                                                    <div className="h-12 w-16 bg-slate-200 rounded-md overflow-hidden shrink-0">
                                                        {vehicle.foto_utama_display ? (
                                                            <img
                                                                src={'/storage/' + vehicle.foto_utama_display.url_foto}
                                                                className="w-full h-full object-cover"
                                                                onError={(e) => {
                                                                    e.target.style.display = 'none';
                                                                    e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-xs text-slate-400">Err</div>';
                                                                }}
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                                                                No Img
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-slate-900">{vehicle.merk}</div>
                                                        <div className="text-xs text-slate-500">
                                                            {vehicle.plat_nomor} • {vehicle.jenis || 'N/A'}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-slate-900">
                                                        Rp {Number(vehicle.harga_sewa_per_hari).toLocaleString('id-ID')}
                                                    </div>
                                                    <div className="mt-1">
                                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getStatusBadgeClass(vehicle.status)}`}>
                                                            {vehicle.status}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right space-x-2">
                                                    <button
                                                        onClick={() => handleEdit(vehicle)}
                                                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(vehicle.id)}
                                                        className="text-rose-500 hover:text-rose-700 text-sm font-medium"
                                                    >
                                                        Hapus
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}