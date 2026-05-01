<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PesananLayanan extends Model
{
    use HasFactory;

    protected $table = 'pesanan_layanan';

    public $timestamps = true;

    protected $fillable = [
        'pemesanan_id',
        'layanan_id',
        'harga_saat_dipesan',
    ];

    protected $primaryKey = ['pemesanan_id', 'layanan_id'];
    public $incrementing = false;

    public function pemesanan(): BelongsTo
    {
        return $this->belongsTo(Pemesanan::class);
    }

    public function layanan(): BelongsTo
    {
        return $this->belongsTo(LayananTambahan::class, 'layanan_id');
    }
}
