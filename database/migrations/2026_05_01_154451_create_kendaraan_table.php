<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('kendaraan', function (Blueprint $table) {
            $table->id();
            $table->string('plat_nomor', 20)->unique();
            $table->string('merk', 100);
            $table->decimal('harga_sewa_per_jam', 10, 2);
            $table->enum('status', ['Tersedia', 'Disewa', 'Maintenance'])->default('Tersedia');
            $table->integer('jarak_tempuh')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kendaraan');
    }
};
