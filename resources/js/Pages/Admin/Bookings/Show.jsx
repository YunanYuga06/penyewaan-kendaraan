import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import StatusBadge from '@/Components/StatusBadge';

export default function AdminBookingShow({ pemesanan }) {
    const { put, processing } = useForm({ status_pesanan: '' });

    const updateStatus = (status) => {
        if (!confirm(`Ubah status pesanan menjadi ${status}?`)) return;
        put(route('admin.pemesanan.status', pemesanan.id), {
            data: { status_pesanan: status },
        });
    };

    const formatDate = (date) =>
        new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    const statusOptions = {
        Pending: ['Aktif', 'Batal'],
        Aktif: ['Selesai', 'Batal'],
        Selesai: [],
        Batal: [],
    };

    const actions = statusOptions[pemesanan.status_pesanan] || [];

    return (
        <AdminLayout title='Detail Pemesanan'>
            <Head title={'Detail Pemesanan #' + pemesanan.id} />

            <div className='py-8'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <Link href={route('admin.pemesanan.index')} className='text-indigo-600 hover:text-indigo-800 mb-4 inline-flex items-center'>
                        <svg className='w-4 h-4 mr-1' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                        </svg>
                        Kembali ke Daftar Pemesanan
                    </Link>

                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                        {/* Left: Booking Details */}
                        <div className='lg:col-span-2 space-y-6'>
                            {/* Invoice Card */}
                            <div className='bg-white rounded-lg shadow overflow-hidden'>
                                <div className='px-6 py-4 bg-indigo-600 text-white flex justify-between items-center'>
                                    <div>
                                        <h1 className='text-xl font-bold'>Detail Pemesanan</h1>
                                        <p className='text-indigo-200 text-sm'>#{pemesanan.id}</p>
                                    </div>
                                    <StatusBadge status={pemesanan.status_pesanan} size='md' />
                                </div>

                                <div className='px-6 py-5'>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                        <div>
                                            <h2 className='text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3'>Kendaraan</h2>
                                            <div className='space-y-2 text-sm'>
                                                <div className='flex justify-between'>
                                                    <span className='text-gray-600'>Merk</span>
                                                    <span className='font-medium text-gray-900'>{pemesanan.kendaraan?.merk}</span>
                                                </div>
                                                <div className='flex justify-between'>
                                                    <span className='text-gray-600'>Plat Nomor</span>
                                                    <span className='font-medium text-gray-900'>{pemesanan.kendaraan?.plat_nomor}</span>
                                                </div>
                                                <div className='flex justify-between'>
                                                    <span className='text-gray-600'>Jenis</span>
                                                    <span className='font-medium text-gray-900'>{pemesanan.kendaraan?.jenis}</span>
                                                </div>
                                                <div className='flex justify-between'>
                                                    <span className='text-gray-600'>Harga Sewa</span>
                                                    <span className='font-medium text-gray-900'>
                                                        Rp {Number(pemesanan.kendaraan?.harga_sewa_per_jam).toLocaleString('id-ID')}/jam
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className='text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3'>Penyewa</h2>
                                            <div className='space-y-2 text-sm'>
                                                <div className='flex justify-between'>
                                                    <span className='text-gray-600'>Nama</span>
                                                    <span className='font-medium text-gray-900'>{pemesanan.penyewa?.user?.name}</span>
                                                </div>
                                                <div className='flex justify-between'>
                                                    <span className='text-gray-600'>Email</span>
                                                    <span className='font-medium text-gray-900'>{pemesanan.penyewa?.user?.email}</span>
                                                </div>
                                                <div className='flex justify-between'>
                                                    <span className='text-gray-600'>No. HP</span>
                                                    <span className='font-medium text-gray-900'>{pemesanan.penyewa?.no_hp || '-'}</span>
                                                </div>
                                                <div className='flex justify-between'>
                                                    <span className='text-gray-600'>Alamat</span>
                                                    <span className='font-medium text-gray-900 text-right max-w-xs'>{pemesanan.penyewa?.alamat || '-'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='mt-6'>
                                        <h2 className='text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3'>Waktu & Lokasi</h2>
                                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                            <div className='bg-gray-50 rounded-lg p-3'>
                                                <p className='text-xs text-gray-500'>Tanggal Sewa</p>
                                                <p className='font-semibold text-gray-900 text-sm'>{formatDate(pemesanan.tgl_sewa)}</p>
                                            </div>
                                            <div className='bg-gray-50 rounded-lg p-3'>
                                                <p className='text-xs text-gray-500'>Tanggal Kembali</p>
                                                <p className='font-semibold text-gray-900 text-sm'>{formatDate(pemesanan.tgl_kembali_rencana)}</p>
                                            </div>
                                            <div className='bg-gray-50 rounded-lg p-3'>
                                                <p className='text-xs text-gray-500'>Lokasi Antar</p>
                                                <p className='font-semibold text-gray-900 text-sm'>{pemesanan.lokasi_antar}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Services */}
                            {pemesanan.layanan && pemesanan.layanan.length > 0 && (
                                <div className='bg-white rounded-lg shadow overflow-hidden'>
                                    <div className='px-6 py-4 border-b'>
                                        <h2 className='text-lg font-semibold text-gray-900'>Layanan Tambahan</h2>
                                    </div>
                                    <table className='min-w-full divide-y divide-gray-200'>
                                        <thead className='bg-gray-50'>
                                            <tr>
                                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Layanan</th>
                                                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase'>Harga</th>
                                            </tr>
                                        </thead>
                                        <tbody className='divide-y divide-gray-200'>
                                            {pemesanan.layanan.map((l) => (
                                                <tr key={l.id}>
                                                    <td className='px-6 py-3 text-sm text-gray-900'>{l.nama_layanan}</td>
                                                    <td className='px-6 py-3 text-sm text-gray-900 text-right'>
                                                        Rp {Number(l.pivot?.harga_saat_dipesan || l.harga).toLocaleString('id-ID')}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {/* Payments */}
                            {pemesanan.pembayaran && pemesanan.pembayaran.length > 0 && (
                                <div className='bg-white rounded-lg shadow overflow-hidden'>
                                    <div className='px-6 py-4 border-b'>
                                        <h2 className='text-lg font-semibold text-gray-900'>Riwayat Pembayaran</h2>
                                    </div>
                                    <div className='divide-y divide-gray-200'>
                                        {pemesanan.pembayaran.map((pmt) => (
                                            <div key={pmt.id} className='px-6 py-4'>
                                                <div className='flex justify-between items-start'>
                                                    <div>
                                                        <div className='flex items-center gap-2'>
                                                            <span className='font-semibold text-gray-900'>{pmt.jenis_bayar}</span>
                                                            <StatusBadge status={pmt.status_bayar} size='sm' />
                                                        </div>
                                                        <p className='text-xs text-gray-500 mt-1'>
                                                            {pmt.tgl_bayar ? formatDate(pmt.tgl_bayar) : '-'} &middot; {pmt.metode_bayar}
                                                        </p>
                                                    </div>
                                                    <span className='text-lg font-bold text-indigo-600'>
                                                        Rp {Number(pmt.nominal).toLocaleString('id-ID')}
                                                    </span>
                                                </div>
                                                {pmt.bukti_transfer && (
                                                    <div className='mt-3'>
                                                        <p className='text-xs text-gray-500 mb-2'>Bukti Transfer:</p>
                                                        {pmt.bukti_transfer.match(/\.(jpg|jpeg|png|gif)(\?|$)/i) ? (
                                                            <img src={pmt.bukti_transfer.startsWith('http') ? pmt.bukti_transfer : '/storage/' + pmt.bukti_transfer} alt='Bukti' className='h-32 rounded border object-contain bg-gray-50' />
                                                        ) : (
                                                            <a href={pmt.bukti_transfer.startsWith('http') ? pmt.bukti_transfer : '/storage/' + pmt.bukti_transfer} target='_blank' rel='noopener noreferrer' className='text-indigo-600 hover:underline text-sm'>Lihat Bukti Transfer</a>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right: Summary & Actions */}
                        <div className='lg:col-span-1'>
                            <div className='bg-white rounded-lg shadow sticky top-6'>
                                <div className='px-6 py-4 border-b'>
                                    <h2 className='text-lg font-semibold text-gray-900'>Ringkasan</h2>
                                </div>
                                <div className='px-6 py-4'>
                                    <div className='space-y-3 text-sm'>
                                        <div className='flex justify-between'>
                                            <span className='text-gray-600'>Total Biaya</span>
                                            <span className='font-bold text-indigo-600 text-base'>
                                                Rp {Number(pemesanan.total_biaya).toLocaleString('id-ID')}
                                            </span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span className='text-gray-600'>Status Pesanan</span>
                                            <StatusBadge status={pemesanan.status_pesanan} size='sm' />
                                        </div>
                                    </div>

                                    {actions.length > 0 && (
                                        <div className='mt-6 pt-4 border-t space-y-2'>
                                            <p className='text-sm font-semibold text-gray-700'>Ubah Status:</p>
                                            {actions.map((status) => (
                                                <button
                                                    key={status}
                                                    onClick={() => updateStatus(status)}
                                                    disabled={processing}
                                                    className={
                                                        'w-full px-4 py-2 text-sm font-medium rounded-md transition disabled:opacity-50 ' +
                                                        (status === 'Aktif' ? 'bg-green-600 text-white hover:bg-green-700' :
                                                         status === 'Selesai' ? 'bg-blue-600 text-white hover:bg-blue-700' :
                                                         'bg-red-600 text-white hover:bg-red-700')
                                                    }
                                                >
                                                    {status === 'Aktif' ? 'Aktifkan Pesanan' : status === 'Selesai' ? 'Tandai Selesai' : 'Batalkan Pesanan'}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}