<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pembayaran extends Model
{
    use HasFactory;

    protected $table = 'pembayaran';

    protected $fillable = [
        'pemesanan_id',
        'jenis_bayar',
        'metode_bayar',
        'nominal',
        'bukti_transfer',
        'status_bayar',
        'tgl_bayar',
    ];

    protected $casts = [
        'tgl_bayar' => 'datetime',
    ];

    public function pemesanan(): BelongsTo
    {
        return $this->belongsTo(Pemesanan::class);
    }
}