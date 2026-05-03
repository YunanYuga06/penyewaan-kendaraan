<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('kendaraan', function (Blueprint $table) {
            $table->string('jenis')->nullable()->after('merk');
            $table->renameColumn('harga_sewa_per_jam', 'harga_sewa_per_hari');
        });
    }

    public function down(): void
    {
        Schema::table('kendaraan', function (Blueprint $table) {
            $table->dropColumn('jenis');
            $table->renameColumn('harga_sewa_per_hari', 'harga_sewa_per_jam');
        });
    }
};
