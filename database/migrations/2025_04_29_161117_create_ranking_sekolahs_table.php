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
        DB::statement("
            CREATE VIEW ranking_sekolahs AS
            SELECT
                sekolah_id,
                AVG(AVG_Nilai) AS AVG_Nilai
            FROM ranking_siswas
            GROUP BY sekolah_id
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('DROP VIEW IF EXISTS ranking_sekolahs');
    }
};
