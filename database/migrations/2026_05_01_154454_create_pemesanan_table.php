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
        Schema::create('pemesanan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('penyewa_id')->constrained('penyewa')->onDelete('cascade');
            $table->foreignId('kendaraan_id')->constrained('kendaraan')->onDelete('cascade');
            $table->foreignId('pengantar_id')->nullable()->constrained('pengantar_mobil')->onDelete('set null');
            $table->dateTime('tgl_sewa');
            $table->dateTime('tgl_kembali_rencana');
            $table->dateTime('tgl_kembali_aktual')->nullable();
            $table->text('lokasi_antar');
            $table->enum('status_pesanan', ['Pending', 'Aktif', 'Selesai', 'Batal'])->default('Pending');
            $table->decimal('total_biaya', 12, 2);
            $table->decimal('denda_keterlambatan', 10, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pemesanan');
    }
};
