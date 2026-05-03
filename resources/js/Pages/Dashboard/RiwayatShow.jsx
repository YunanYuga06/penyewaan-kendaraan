import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import StatusBadge from '@/Components/StatusBadge';

export default function RiwayatShow({ pemesanan }) {
    const formatDate = (date) =>
        new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    return (
        <AppLayout title='Detail Pemesanan'>
            <Head title='Detail Pemesanan' />

            <div className='py-12'>
                <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <Link href={route('dashboard.riwayat')} className='text-indigo-600 hover:text-indigo-800 mb-4 inline-flex items-center'>
                        <svg className='w-4 h-4 mr-1' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                        </svg>
                        Kembali ke Riwayat
                    </Link>

                    <div className='bg-white shadow-xl sm:rounded-lg overflow-hidden'>
                        {/* Invoice Header */}
                        <div className='px-6 py-5 bg-indigo-600 text-white'>
                            <div className='flex justify-between items-start'>
                                <div>
                                    <h1 className='text-2xl font-bold'>Invoice Pemesanan</h1>
                                    <p className='text-indigo-200 mt-1'>#{pemesanan.id}</p>
                                </div>
                                <StatusBadge status={pemesanan.status_pesanan} size='md' />
                            </div>
                        </div>

                        <div className='px-6 py-5'>
                            {/* Booking Details */}
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                                <div>
                                    <h2 className='text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3'>Detail Penyewaan</h2>
                                    <div className='space-y-2 text-sm'>
                                        <div className='flex justify-between'>
                                            <span className='text-gray-600'>Kendaraan</span>
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
                                    </div>
                                </div>
                                <div>
                                    <h2 className='text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3'>Waktu & Lokasi</h2>
                                    <div className='space-y-2 text-sm'>
                                        <div className='flex justify-between'>
                                            <span className='text-gray-600'>Tanggal Sewa</span>
                                            <span className='font-medium text-gray-900'>{formatDate(pemesanan.tgl_sewa)}</span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span className='text-gray-600'>Tanggal Kembali</span>
                                            <span className='font-medium text-gray-900'>{formatDate(pemesanan.tgl_kembali_rencana)}</span>
                                        </div>
                                        <div>
                                            <span className='text-gray-600'>Lokasi Antar</span>
                                            <p className='font-medium text-gray-900 mt-1'>{pemesanan.lokasi_antar}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Services / Add-ons */}
                            {pemesanan.layanan && pemesanan.layanan.length > 0 && (
                                <div className='mb-6'>
                                    <h2 className='text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3'>Layanan Tambahan</h2>
                                    <div className='bg-gray-50 rounded-lg overflow-hidden'>
                                        <table className='min-w-full divide-y divide-gray-200'>
                                            <thead className='bg-gray-100'>
                                                <tr>
                                                    <th className='px-4 py-2 text-left text-xs font-medium text-gray-500'>Layanan</th>
                                                    <th className='px-4 py-2 text-right text-xs font-medium text-gray-500'>Harga</th>
                                                </tr>
                                            </thead>
                                            <tbody className='divide-y divide-gray-200'>
                                                {pemesanan.layanan.map((l) => (
                                                    <tr key={l.id}>
                                                        <td className='px-4 py-2 text-sm text-gray-900'>{l.nama_layanan}</td>
                                                        <td className='px-4 py-2 text-sm text-gray-900 text-right'>
                                                            Rp {Number(l.pivot?.harga_saat_dipesan || l.harga).toLocaleString('id-ID')}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {/* Payment History */}
                            {pemesanan.pembayaran && pemesanan.pembayaran.length > 0 && (
                                <div className='mb-6'>
                                    <h2 className='text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3'>Riwayat Pembayaran</h2>
                                    <div className='space-y-3'>
                                        {pemesanan.pembayaran.map((pmt) => (
                                            <div key={pmt.id} className='border rounded-lg p-4'>
                                                <div className='flex justify-between items-center mb-2'>
                                                    <div className='flex items-center gap-2'>
                                                        <span className='font-medium text-gray-900'>{pmt.jenis_bayar}</span>
                                                        <StatusBadge status={pmt.status_bayar} size='sm' />
                                                    </div>
                                                    <span className='font-bold text-indigo-600'>
                                                        Rp {Number(pmt.nominal).toLocaleString('id-ID')}
                                                    </span>
                                                </div>
                                                <div className='text-xs text-gray-500 flex justify-between'>
                                                    <span>Tanggal: {pmt.tgl_bayar ? new Date(pmt.tgl_bayar).toLocaleDateString('id-ID') : '-'}</span>
                                                    <span>Metode: {pmt.metode_bayar}</span>
                                                </div>
                                                {pmt.bukti_transfer && (
                                                    <div className='mt-2'>
                                                        {pmt.bukti_transfer.match(/\.(jpg|jpeg|png|gif)(\?|$)/i) ? (
                                                            <img src={pmt.bukti_transfer.startsWith('http') ? pmt.bukti_transfer : '/storage/' + pmt.bukti_transfer} alt='Bukti' className='h-24 rounded border' />
                                                        ) : (
                                                            <a href={pmt.bukti_transfer.startsWith('http') ? pmt.bukti_transfer : '/storage/' + pmt.bukti_transfer} target='_blank' rel='noopener noreferrer' className='text-indigo-600 hover:underline text-xs'>Lihat Bukti</a>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Total */}
                            <div className='border-t pt-4'>
                                <div className='flex justify-between items-center'>
                                    <span className='text-lg font-semibold text-gray-900'>Total Biaya</span>
                                    <span className='text-2xl font-bold text-indigo-600'>
                                        Rp {Number(pemesanan.total_biaya).toLocaleString('id-ID')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}