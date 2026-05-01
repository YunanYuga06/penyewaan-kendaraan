<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Kendaraan extends Model
{
    use HasFactory;

    protected $table = 'kendaraan';

    protected $fillable = [
        'plat_nomor',
        'merk',
        'harga_sewa_per_jam',
        'status',
        'jarak_tempuh',
    ];

    public function galeri(): HasMany
    {
        return $this->hasMany(GaleriKendaraan::class);
    }

    public function pemesanan(): HasMany
    {
        return $this->hasMany(Pemesanan::class);
    }

    public function logGps(): HasMany
    {
        return $this->hasMany(LogGps::class);
    }
}
