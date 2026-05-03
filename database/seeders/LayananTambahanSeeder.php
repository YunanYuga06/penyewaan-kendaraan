<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LayananTambahanSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('layanan_tambahan')->insert([
            ['nama_layanan' => 'Supir', 'harga' => 150000, 'created_at' => now(), 'updated_at' => now()],
            ['nama_layanan' => 'Antar Jemput Bandara', 'harga' => 100000, 'created_at' => now(), 'updated_at' => now()],
            ['nama_layanan' => 'Child Seat', 'harga' => 50000, 'created_at' => now(), 'updated_at' => now()],
            ['nama_layanan' => 'GPS Navigator', 'harga' => 30000, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}