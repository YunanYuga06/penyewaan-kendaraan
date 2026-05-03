<?php

namespace App\Services;

use Carbon\Carbon;

class PemesananService
{
    public function calculateTotalCost(Carbon $startDate, Carbon $endDate, float $pricePerDay, float $addOnsTotal = 0): float
    {
        $days = $startDate->diffInDays($endDate);

        if ($days <= 0) {
            throw new \InvalidArgumentException('Tanggal kembali harus lebih besar dari tanggal sewa.');
        }

        return ($days * $pricePerDay) + $addOnsTotal;
    }

    public function calculateDP(float $totalCost): float
    {
        return $totalCost * 0.25;
    }

    public function calculateLateFee(Carbon $plannedReturn, Carbon $actualReturn): float
    {
        $lateDays = $plannedReturn->diffInDays($actualReturn);

        if ($lateDays <= 0) {
            return 0;
        }

        $ratePerDay = $lateDays > 5 ? 500000 : 300000;

        return $lateDays * $ratePerDay;
    }
}