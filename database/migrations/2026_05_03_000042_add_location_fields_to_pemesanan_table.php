<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pemesanan', function (Blueprint $table) {
            $table->string('area_penjemputan')->nullable()->after('lokasi_antar');
            $table->text('detail_alamat')->nullable()->after('area_penjemputan');
            $table->string('cakupan_wilayah')->nullable()->after('detail_alamat');
        });
    }

    public function down(): void
    {
        Schema::table('pemesanan', function (Blueprint $table) {
            $table->dropColumn(['area_penjemputan', 'detail_alamat', 'cakupan_wilayah']);
        });
    }
};
