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
            CREATE OR REPLACE VIEW ranking_sekolahs AS
            SELECT
                rs.sekolah_id,
                COUNT(s.sekolah_id) AS jumlah_siswa,
                CASE WHEN COUNT(rs.PABP) = COUNT(s.sekolah_id) THEN 1 ELSE 0 END AS PABP,
                CASE WHEN COUNT(rs.PENDIDIKAN_PANCASILA) = COUNT(s.sekolah_id) THEN 1 ELSE 0 END AS PENDIDIKAN_PANCASILA,
                CASE WHEN COUNT(rs.IPAS) = COUNT(s.sekolah_id) THEN 1 ELSE 0 END AS IPAS,
                CASE WHEN COUNT(rs.BAHASA_JAWA) = COUNT(s.sekolah_id) THEN 1 ELSE 0 END AS BAHASA_JAWA,
                CASE WHEN COUNT(rs.BAHASA_INDONESIA) = COUNT(s.sekolah_id) THEN 1 ELSE 0 END AS BAHASA_INDONESIA,
                CASE WHEN COUNT(rs.SENI_BUDAYA) = COUNT(s.sekolah_id) THEN 1 ELSE 0 END AS SENI_BUDAYA,
                CASE WHEN COUNT(rs.BAHASA_INGGRIS) = COUNT(s.sekolah_id) THEN 1 ELSE 0 END AS BAHASA_INGGRIS,
                CASE WHEN COUNT(rs.PJOK) = COUNT(s.sekolah_id) THEN 1 ELSE 0 END AS PJOK,
                CASE WHEN COUNT(rs.MATEMATIKA) = COUNT(s.sekolah_id) THEN 1 ELSE 0 END AS MATEMATIKA,
                COUNT(s.sekolah_id) * 9 AS wajib_nilai,
                SUM(rs.count_nilai) AS sudah_nilai,
                AVG(avg_nilai) AS avg_nilai
            FROM
                ranking_siswas rs
                LEFT JOIN siswas s ON rs.sekolah_id = s.id
            GROUP BY
                rs.sekolah_id
            ORDER BY
                avg_nilai DESC
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
