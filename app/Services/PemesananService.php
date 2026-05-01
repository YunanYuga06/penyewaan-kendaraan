<?php

namespace App\Services;

use Carbon\Carbon;

class PemesananService
{
    public function calculateTotalCost(Carbon $startDate, Carbon $endDate, float $pricePerHour, float $addOnsTotal = 0): float
    {
        $hours = $startDate->diffInHours($endDate);

        if ($hours <= 0) {
            throw new \InvalidArgumentException('Tanggal kembali harus lebih besar dari tanggal sewa.');
        }

        return ($hours * $pricePerHour) + $addOnsTotal;
    }

    public function calculateDP(float $totalCost): float
    {
        return $totalCost * 0.25;
    }

    public function calculateLateFee(Carbon $plannedReturn, Carbon $actualReturn): float
    {
        $lateHours = $plannedReturn->diffInHours($actualReturn);

        if ($lateHours <= 0) {
            return 0;
        }

        $ratePerHour = $lateHours > 5 ? 20000 : 15000;

        return $lateHours * $ratePerHour;
    }
}
