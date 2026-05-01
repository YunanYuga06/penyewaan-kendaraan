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
        Schema::create('pesanan_layanan', function (Blueprint $table) {
            $table->foreignId('pemesanan_id')->constrained('pemesanan')->onDelete('cascade');
            $table->foreignId('layanan_id')->constrained('layanan_tambahan')->onDelete('cascade');
            $table->decimal('harga_saat_dipesan', 10, 2);
            $table->timestamps();
            $table->primary(['pemesanan_id', 'layanan_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pesanan_layanan');
    }
};
