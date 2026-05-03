<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('penyewa', function (Blueprint $table) {
            $table->string('no_hp', 20)->nullable()->after('nik');
            $table->text('alamat')->nullable()->after('no_hp');
        });
    }

    public function down(): void
    {
        Schema::table('penyewa', function (Blueprint $table) {
            $table->dropColumn(['no_hp', 'alamat']);
        });
    }
};
