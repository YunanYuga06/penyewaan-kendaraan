<?php

namespace App\Services;

use App\Models\Kendaraan;

class KendaraanService
{
    public function checkMaintenanceStatus(Kendaraan $kendaraan): void
    {
        if ($kendaraan->jarak_tempuh > 0 && $kendaraan->jarak_tempuh % 3000 === 0) {
            $kendaraan->update(['status' => 'Maintenance']);
        }
    }
}
