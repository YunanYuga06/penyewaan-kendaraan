import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';

export default function CheckoutCreate({ kendaraan, addOns }) {
    const { data, setData, post, processing, errors } = useForm({
        kendaraan_id: kendaraan.id,
        tgl_sewa: '',
        tgl_kembali_rencana: '',
        area_penjemputan: '',
        detail_alamat: '',
        cakupan_wilayah: '',
        layanan_ids: [],
    });

    const [dateError, setDateError] = useState('');

    const toggleAddOn = (id) => {
        const selected = data.layanan_ids.includes(id)
            ? data.layanan_ids.filter((i) => i !== id)
            : [...data.layanan_ids, id];
        setData('layanan_ids', selected);
    };

    const calculateDuration = () => {
        if (!data.tgl_sewa || !data.tgl_kembali_rencana) return 0;
        const start = new Date(data.tgl_sewa);
        const end = new Date(data.tgl_kembali_rencana);
        const diffMs = end - start;
        const diffDays = diffMs / (1000 * 60 * 60 * 24);
        return diffDays > 0 ? Math.ceil(diffDays) : 0;
    };

    const calculateTotal = () => {
        const duration = calculateDuration();
        if (duration <= 0) return 0;
        const rentalCost = Number(duration) * Number(kendaraan.harga_sewa_per_hari);
        const addOnCost = addOns
            ? addOns
                  .filter((addon) => data.layanan_ids.includes(addon.id))
                  .reduce((sum, addon) => sum + Number(addon.harga), 0)
            : 0;
        return Number(rentalCost) + Number(addOnCost);
    };

    const calculateDP = () => {
        return Math.ceil(Number(calculateTotal()) * 0.25);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!data.tgl_sewa || !data.tgl_kembali_rencana) {
            setDateError('Mohon isi tanggal sewa dan tanggal kembali.');
            return;
        }

        const start = new Date(data.tgl_sewa);
        const end = new Date(data.tgl_kembali_rencana);
        if (end <= start) {
            setDateError('Tanggal kembali harus setelah tanggal sewa.');
            return;
        }

        setDateError('');
        post(route('checkout'), data);
    };

    const selectedAddOns = addOns
        ? addOns.filter((addon) => data.layanan_ids.includes(addon.id))
        : [];

    return (
        <FrontendLayout title="Checkout - SewaMobil">
            <Head title="Checkout - SewaMobil" />

            <section className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <Link href={route('catalog.show', kendaraan.id)} className="text-indigo-600 hover:text-indigo-800 mb-4 inline-flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Kembali ke Detail Kendaraan
                </Link>

                <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout Pemesanan</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Kendaraan yang Dipilih</h2>
                            <div className="flex gap-4">
                                <div className="w-24 h-16 bg-gray-200 rounded-md flex-shrink-0 overflow-hidden">
                                    {kendaraan.galeri?.length > 0 && (
                                        <img src={'/storage/' + (kendaraan.galeri.find((g) => g.is_utama)?.url_foto || kendaraan.galeri[0]?.url_foto)} alt={kendaraan.merk} className="w-full h-full object-cover" />
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">{kendaraan.merk}</h3>
                                    <p className="text-sm text-gray-500">{kendaraan.jenis} - Plat {kendaraan.plat_nomor}</p>
                                    <p className="text-indigo-600 font-bold">Rp {Number(kendaraan.harga_sewa_per_hari).toLocaleString('id-ID')}/hari</p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Detail Penyewaan</h2>

                            {errors.error && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{errors.error}</div>
                            )}
                            {dateError && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{dateError}</div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai</label>
                                    <input
                                        type="date"
                                        value={data.tgl_sewa}
                                        onChange={(e) => {
                                            setData('tgl_sewa', e.target.value);
                                            setDateError('');
                                        }}
                                        min={new Date().toISOString().slice(0, 10)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                    {errors.tgl_sewa && <p className="mt-1 text-sm text-red-600">{errors.tgl_sewa}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Kembali</label>
                                    <input
                                        type="date"
                                        value={data.tgl_kembali_rencana}
                                        onChange={(e) => {
                                            setData('tgl_kembali_rencana', e.target.value);
                                            setDateError('');
                                        }}
                                        min={data.tgl_sewa || new Date().toISOString().slice(0, 10)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                    {errors.tgl_kembali_rencana && <p className="mt-1 text-sm text-red-600">{errors.tgl_kembali_rencana}</p>}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Area Penjemputan</label>
                                <select
                                    value={data.area_penjemputan}
                                    onChange={(e) => setData('area_penjemputan', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                >
                                    <option value="" disabled>Pilih Area...</option>
                                    <option value="Stasiun Purwokerto">Stasiun Purwokerto</option>
                                    <option value="Terminal Bulupitu">Terminal Bulupitu</option>
                                    <option value="Area Kampus (Unsoed/UMP)">Area Kampus (Unsoed/UMP)</option>
                                    <option value="Baturraden">Baturraden</option>
                                    <option value="Sokaraja">Sokaraja</option>
                                    <option value="Lainnya (Dalam Kota)">Lainnya (Dalam Kota)</option>
                                </select>
                                {errors.area_penjemputan && <p className="mt-1 text-sm text-red-600">{errors.area_penjemputan}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Detail Alamat / Patokan</label>
                                <textarea
                                    value={data.detail_alamat}
                                    onChange={(e) => setData('detail_alamat', e.target.value)}
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Contoh: Perumahan X, Blok Y No 12, pagar hitam depan warung..."
                                    required
                                />
                                {errors.detail_alamat && <p className="mt-1 text-sm text-red-600">{errors.detail_alamat}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Rencana Cakupan Wilayah</label>
                                <select
                                    value={data.cakupan_wilayah}
                                    onChange={(e) => setData('cakupan_wilayah', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                >
                                    <option value="" disabled>Pilih Wilayah...</option>
                                    <option value="Dalam Kota (Purwokerto & Sekitarnya)">Dalam Kota (Purwokerto & Sekitarnya)</option>
                                    <option value="Luar Kota (Barlingmascakeb)">Luar Kota (Barlingmascakeb)</option>
                                    <option value="Luar Provinsi (Konfirmasi Admin)">Luar Provinsi (Konfirmasi Admin)</option>
                                </select>
                                {errors.cakupan_wilayah && <p className="mt-1 text-sm text-red-600">{errors.cakupan_wilayah}</p>}
                            </div>

                            {addOns && addOns.length > 0 && (
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Layanan Tambahan</label>
                                    <div className="space-y-2">
                                        {addOns.map((addon) => (
                                            <label
                                                key={addon.id}
                                                className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition"
                                            >
                                                <div className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={data.layanan_ids.includes(addon.id)}
                                                        onChange={() => toggleAddOn(addon.id)}
                                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                    />
                                                    <span className="ml-3 font-medium text-gray-900">{addon.nama_layanan}</span>
                                                </div>
                                                <span className="text-indigo-600 font-semibold">+Rp {Number(addon.harga).toLocaleString('id-ID')}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={processing}
                                className="mt-6 w-full px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                            >
                                {processing ? 'Memproses Pemesanan...' : 'Lanjut ke Pembayaran'}
                            </button>
                        </form>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow p-6 sticky top-24">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Ringkasan Biaya</h2>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Harga sewa</span>
                                    <span className="font-medium">Rp {Number(kendaraan.harga_sewa_per_hari).toLocaleString('id-ID')}/hari</span>
                                </div>

                                {calculateDuration() > 0 && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Durasi</span>
                                        <span className="font-medium">{calculateDuration()} hari</span>
                                    </div>
                                )}

                                {calculateDuration() > 0 && (
                                    <div className="flex justify-between pt-2 border-t">
                                        <span className="text-gray-600">Biaya sewa</span>
                                        <span className="font-medium">Rp {(Number(calculateDuration()) * Number(kendaraan.harga_sewa_per_hari)).toLocaleString('id-ID')}</span>
                                    </div>
                                )}

                                {selectedAddOns.length > 0 && (
                                    <div>
                                        <p className="text-gray-600 mb-1">Layanan tambahan:</p>
                                        <div className="space-y-1 ml-4">
                                            {selectedAddOns.map((addon) => (
                                                <div key={addon.id} className="flex justify-between">
                                                    <span className="text-gray-500">{addon.nama_layanan}</span>
                                                    <span className="text-gray-700">Rp {Number(addon.harga).toLocaleString('id-ID')}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {calculateTotal() > 0 && (
                                    <>
                                        <div className="flex justify-between pt-2 border-t">
                                            <span className="font-semibold text-gray-900">Total Biaya</span>
                                            <span className="font-bold text-indigo-600 text-base">Rp {calculateTotal().toLocaleString('id-ID')}</span>
                                        </div>

                                        <div className="p-3 bg-indigo-50 rounded-lg mt-4">
                                            <p className="text-sm text-indigo-700 font-medium mb-1">DP yang harus dibayar (25%)</p>
                                            <p className="text-2xl font-bold text-indigo-700">Rp {calculateDP().toLocaleString('id-ID')}</p>
                                            <p className="text-xs text-indigo-500 mt-1">Pelunasan dilakukan setelah verifikasi</p>
                                        </div>

                                        <div className="p-3 bg-amber-50 rounded-lg mt-3">
                                            <p className="text-sm text-amber-700">Transfer ke:</p>
                                            <p className="font-semibold text-amber-800">BCA 1234567890</p>
                                            <p className="text-sm text-amber-700">a.n. PT SewaMobil Indonesia</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </FrontendLayout>
    );
}