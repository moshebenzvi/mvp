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
        DB::statement("
            CREATE OR REPLACE VIEW tingkat_penyelesaian AS
            SELECT
                SUM(sudah_nilai) AS total_sudah_nilai,
                SUM(wajib_nilai) AS total_wajib_nilai,
                CASE
                    WHEN SUM(wajib_nilai) = 0 THEN 0
                    ELSE (SUM(sudah_nilai) / SUM(wajib_nilai)) * 100
                    END AS tingkat_penyelesaian
            FROM
                ranking_sekolahs
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('DROP VIEW IF EXISTS tingkat_penyelesaian');
    }
};
