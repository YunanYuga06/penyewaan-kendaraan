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
        Schema::create('pembayaran', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pemesanan_id')->constrained('pemesanan')->onDelete('cascade');
            $table->enum('jenis_bayar', ['DP', 'Pelunasan', 'Denda']);
            $table->string('metode_bayar', 50);
            $table->decimal('nominal', 12, 2);
            $table->text('bukti_transfer')->nullable();
            $table->enum('status_bayar', ['Menunggu', 'Tervalidasi', 'Gagal'])->default('Menunggu');
            $table->dateTime('tgl_bayar');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pembayaran');
    }
};
