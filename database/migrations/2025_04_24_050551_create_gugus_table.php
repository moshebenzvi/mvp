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
        Schema::create('gugus', function (Blueprint $table) {
            $table->id();
            $table->integer('gugus');
            $table->foreignId('kecamatan_id')->constrained()->cascadeOnDelete();
            $table->unique(['gugus', 'kecamatan_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('guguses');
    }
};
