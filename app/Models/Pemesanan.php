<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Pemesanan extends Model
{
    use HasFactory;

    protected $table = 'pemesanan';

    protected $fillable = [
        'penyewa_id',
        'kendaraan_id',
        'pengantar_id',
        'tgl_sewa',
        'tgl_kembali_rencana',
        'tgl_kembali_aktual',
        'area_penjemputan',
        'detail_alamat',
        'cakupan_wilayah',
        'status_pesanan',
        'total_biaya',
        'denda_keterlambatan',
    ];

    protected $casts = [
        'tgl_sewa' => 'datetime',
        'tgl_kembali_rencana' => 'datetime',
        'tgl_kembali_aktual' => 'datetime',
    ];

    public function penyewa(): BelongsTo
    {
        return $this->belongsTo(Penyewa::class);
    }

    public function kendaraan(): BelongsTo
    {
        return $this->belongsTo(Kendaraan::class);
    }

    public function pengantar(): BelongsTo
    {
        return $this->belongsTo(PengantarMobil::class, 'pengantar_id');
    }

    public function layanan(): BelongsToMany
    {
        return $this->belongsToMany(LayananTambahan::class, 'pesanan_layanan', 'pemesanan_id', 'layanan_id')
            ->withPivot('harga_saat_dipesan')
            ->withTimestamps();
    }

    public function pembayaran(): HasMany
    {
        return $this->hasMany(Pembayaran::class);
    }
}
