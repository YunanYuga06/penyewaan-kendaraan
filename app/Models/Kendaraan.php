<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Kendaraan extends Model
{
    use HasFactory;

    protected $table = 'kendaraan';

    protected $fillable = [
        'plat_nomor',
        'merk',
        'jenis',
        'harga_sewa_per_hari',
        'status',
        'jarak_tempuh',
    ];

    protected $appends = ['foto_utama_display'];

    public function galeri(): HasMany
    {
        return $this->hasMany(GaleriKendaraan::class);
    }

    public function fotoUtama(): HasOne
    {
        return $this->hasOne(GaleriKendaraan::class)->where('is_utama', true);
    }

    protected function fotoUtamaDisplay(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->fotoUtama ?? $this->galeri->first(),
        );
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
