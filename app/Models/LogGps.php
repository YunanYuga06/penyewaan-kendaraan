<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LogGps extends Model
{
    use HasFactory;

    protected $table = 'log_gps';

    protected $fillable = [
        'kendaraan_id',
        'lintang_lat',
        'bujur_long',
        'waktu_log',
    ];

    protected $casts = [
        'waktu_log' => 'datetime',
    ];

    public function kendaraan(): BelongsTo
    {
        return $this->belongsTo(Kendaraan::class);
    }
}
