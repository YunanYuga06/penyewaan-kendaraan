<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PengantarMobil extends Model
{
    use HasFactory;

    protected $table = 'pengantar_mobil';

    protected $fillable = [
        'user_id',
        'status_ketersediaan',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function pemesanan(): HasMany
    {
        return $this->hasMany(Pemesanan::class, 'pengantar_id');
    }
}
