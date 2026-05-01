<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GaleriKendaraan extends Model
{
    use HasFactory;

    protected $table = 'galeri_kendaraan';

    protected $fillable = [
        'kendaraan_id',
        'url_foto',
        'kategori_foto',
        'is_utama',
    ];

    public function kendaraan(): BelongsTo
    {
        return $this->belongsTo(Kendaraan::class);
    }
}
