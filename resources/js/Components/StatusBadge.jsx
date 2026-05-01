export default function StatusBadge({ status, size = 'md' }) {
    const sizes = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-2 text-base',
    };

    const colors = {
        Pending: 'bg-yellow-100 text-yellow-800',
        Aktif: 'bg-blue-100 text-blue-800',
        Selesai: 'bg-green-100 text-green-800',
        Batal: 'bg-red-100 text-red-800',
        Tersedia: 'bg-green-100 text-green-800',
        Disewa: 'bg-yellow-100 text-yellow-800',
        Maintenance: 'bg-red-100 text-red-800',
        Menunggu: 'bg-yellow-100 text-yellow-800',
        Tervalidasi: 'bg-green-100 text-green-800',
        Gagal: 'bg-red-100 text-red-800',
    };

    return (
        <span className={`inline-flex font-semibold rounded-full ${sizes[size]} ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
            {status}
        </span>
    );
}
