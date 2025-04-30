<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('nilais', function (Blueprint $table) {
            $table->id();
            $table->foreignId('siswa_id')->constrained()->cascadeOnDelete();
            $table->foreignId('mapel_id')->constrained()->cascadeOnDelete();
            $table->decimal('nilai', 5, 2);
            $table->unique(['siswa_id', 'mapel_id']);
            $table->timestamps();

            $table->index('nilai'); // Added index
            $table->index(['mapel_id', 'nilai']); // Added composite index
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nilais');
    }
};
