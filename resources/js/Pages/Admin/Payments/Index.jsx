import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import StatusBadge from '@/Components/StatusBadge';

export default function AdminPaymentsIndex({ pembayaran, flash }) {
    const { put, processing } = useForm({
        status_bayar: '',
    });

    const verify = (id, status) => {
        if (!confirm(`Verifikasi pembayaran sebagai ${status}?`)) return;
        put(route('admin.pembayaran.verifikasi', id), {
            data: { status_bayar: status },
        });
    };

    return (
        <AdminLayout title='Verifikasi Pembayaran'>
            <div className='py-8'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex justify-between items-center mb-6'>
                        <h1 className='text-2xl font-bold text-gray-900'>Verifikasi Pembayaran</h1>
                        {flash?.success && (
                            <div className='px-4 py-2 bg-green-50 border border-green-200 rounded-lg'>
                                <p className='text-green-700 text-sm font-medium'>{flash.success}</p>
                            </div>
                        )}
                    </div>

                    {!pembayaran.data || pembayaran.data.length === 0 ? (
                        <div className='bg-white rounded-lg shadow p-12 text-center'>
                            <svg className='w-16 h-16 mx-auto text-gray-300 mb-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                            </svg>
                            <p className='text-gray-500'>Tidak ada pembayaran yang menunggu verifikasi.</p>
                        </div>
                    ) : (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {pembayaran.data.map((item) => (
                                <div key={item.id} className='bg-white rounded-lg shadow overflow-hidden'>
                                    {/* Card Header */}
                                    <div className='px-4 py-3 bg-gray-50 border-b flex justify-between items-center'>
                                        <div>
                                            <span className='text-xs font-mono text-gray-400'>#{item.pemesanan?.id}</span>
                                            <h3 className='font-semibold text-gray-900'>{item.pemesanan?.kendaraan?.merk}</h3>
                                        </div>
                                        <StatusBadge status={item.status_bayar} size='sm' />
                                    </div>

                                    {/* Card Body */}
                                    <div className='p-4 space-y-3 text-sm'>
                                        <div className='flex justify-between'>
                                            <span className='text-gray-500'>Penyewa</span>
                                            <span className='font-medium text-gray-900'>{item.pemesanan?.penyewa?.user?.name}</span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span className='text-gray-500'>Jenis</span>
                                            <span className='font-medium text-gray-900'>{item.jenis_bayar}</span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span className='text-gray-500'>Nominal</span>
                                            <span className='font-bold text-indigo-600'>Rp {Number(item.nominal).toLocaleString('id-ID')}</span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span className='text-gray-500'>Tanggal Bayar</span>
                                            <span className='font-medium text-gray-900'>
                                                {item.tgl_bayar ? new Date(item.tgl_bayar).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Proof Preview */}
                                    <div className='px-4 pb-4'>
                                        <p className='text-xs text-gray-500 mb-2'>Bukti Transfer:</p>
                                        {item.bukti_transfer && item.bukti_transfer.match(/\.(jpg|jpeg|png|gif)(\?|$)/i) ? (
                                            <div className='bg-gray-100 rounded-lg overflow-hidden h-40'>
                                                <img src={item.bukti_transfer.startsWith('http') ? item.bukti_transfer : '/storage/' + item.bukti_transfer} alt='Bukti Transfer' className='w-full h-full object-contain' />
                                            </div>
                                        ) : item.bukti_transfer ? (
                                            <a href={item.bukti_transfer.startsWith('http') ? item.bukti_transfer : '/storage/' + item.bukti_transfer} target='_blank' rel='noopener noreferrer' className='block text-center py-8 bg-gray-100 rounded-lg text-indigo-600 hover:text-indigo-700'>
                                                <svg className='w-8 h-8 mx-auto mb-1' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                                                </svg>
                                                <span className='text-sm'>Buka PDF</span>
                                            </a>
                                        ) : (
                                            <div className='bg-gray-100 rounded-lg py-8 text-center text-gray-400'>
                                                <span className='text-sm'>Tidak ada bukti</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className='px-4 pb-4 flex gap-2'>
                                        <button
                                            onClick={() => verify(item.id, 'Tervalidasi')}
                                            disabled={processing}
                                            className='flex-1 px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition disabled:opacity-50'
                                        >
                                            Validasi
                                        </button>
                                        <button
                                            onClick={() => verify(item.id, 'Gagal')}
                                            disabled={processing}
                                            className='flex-1 px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition disabled:opacity-50'
                                        >
                                            Tolak
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {pembayaran.links && pembayaran.links.length > 3 && (
                        <div className='mt-6 flex justify-center'>
                            <div className='flex gap-1'>
                                {pembayaran.links.map((link, idx) => (
                                    <Link
                                        key={idx}
                                        href={link.url || '#'}
                                        className={'px-3 py-1.5 text-sm rounded-md ' + (link.active ? 'bg-indigo-600 text-white' : link.url ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300 cursor-not-allowed')}
                                    >
                                        {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}