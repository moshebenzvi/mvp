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
            CREATE OR REPLACE VIEW ranking_siswas AS
            SELECT
                s.id AS siswa_id,
                s.sekolah_id,
                MAX(CASE WHEN m.nama = 'PABP' THEN n.nilai END) AS PABP,
                MAX(CASE WHEN m.nama = 'PENDIDIKAN PANCASILA' THEN n.nilai END) AS PENDIDIKAN_PANCASILA,
                MAX(CASE WHEN m.nama = 'IPAS' THEN n.nilai END) AS IPAS,
                MAX(CASE WHEN m.nama = 'BAHASA JAWA' THEN n.nilai END) AS BAHASA_JAWA,
                MAX(CASE WHEN m.nama = 'BAHASA INDONESIA' THEN n.nilai END) AS BAHASA_INDONESIA,
                MAX(CASE WHEN m.nama = 'SENI BUDAYA' THEN n.nilai END) AS SENI_BUDAYA,
                MAX(CASE WHEN m.nama = 'BAHASA INGGRIS' THEN n.nilai END) AS BAHASA_INGGRIS,
                MAX(CASE WHEN m.nama = 'PJOK' THEN n.nilai END) AS PJOK,
                MAX(CASE WHEN m.nama = 'MATEMATIKA' THEN n.nilai END) AS MATEMATIKA,
                COUNT(n.nilai) AS count_nilai,
                AVG(n.nilai) AS avg_nilai
            FROM siswas s
            LEFT JOIN nilais n ON s.id = n.siswa_id
            LEFT JOIN mapels m ON n.mapel_id = m.id
            GROUP BY s.id, s.sekolah_id
            ORDER BY avg_nilai DESC
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('DROP VIEW IF EXISTS ranking_siswas');
    }
};
