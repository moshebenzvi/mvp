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
                IF (COUNT(rs.PABP)=COUNT(s.sekolah_id), 1, 0) AS PABP,
                IF (COUNT(rs.PENDIDIKAN_PANCASILA)=COUNT(s.sekolah_id), 1, 0) AS PENDIDIKAN_PANCASILA,
                IF (COUNT(rs.IPAS)=COUNT(s.sekolah_id), 1, 0) AS IPAS,
                IF (COUNT(rs.BAHASA_JAWA)=COUNT(s.sekolah_id), 1, 0) AS BAHASA_JAWA,
                IF (COUNT(rs.BAHASA_INDONESIA)=COUNT(s.sekolah_id), 1, 0) AS BAHASA_INDONESIA,
                IF (COUNT(rs.SENI_BUDAYA)=COUNT(s.sekolah_id), 1, 0) AS SENI_BUDAYA,
                IF (COUNT(rs.BAHASA_INGGRIS)=COUNT(s.sekolah_id), 1, 0) AS BAHASA_INGGRIS,
                IF (COUNT(rs.PJOK)=COUNT(s.sekolah_id), 1, 0) AS PJOK,
                IF (COUNT(rs.MATEMATIKA)=COUNT(s.sekolah_id), 1, 0) AS MATEMATIKA,
                COUNT(s.sekolah_id)*9 AS wajib_nilai,
                SUM(rs.count_nilai) AS sudah_nilai,
                AVG(avg_nilai) AS avg_nilai
            FROM
                ranking_siswas rs
                LEFT JOIN siswas s ON rs.sekolah_id = s.id
            GROUP BY
                sekolah_id
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
