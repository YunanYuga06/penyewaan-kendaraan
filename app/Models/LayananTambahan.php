<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class LayananTambahan extends Model
{
    use HasFactory;

    protected $table = 'layanan_tambahan';

    protected $fillable = [
        'nama_layanan',
        'harga',
    ];

    public function pemesanan(): BelongsToMany
    {
        return $this->belongsToMany(Pemesanan::class, 'pesanan_layanan', 'layanan_id', 'pemesanan_id')
            ->withPivot('harga_saat_dipesan')
            ->withTimestamps();
    }
}
