<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('galeri_kendaraan')
            ->whereIn('id', function ($query) {
                $query->select(DB::raw('MIN(id)'))
                    ->from('galeri_kendaraan')
                    ->groupBy('kendaraan_id');
            })
            ->update(['is_utama' => true]);
    }

    public function down(): void
    {
    }
};
