<?php

namespace App\Exports;

use App\Models\RankingSekolah;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithProperties;

class RankingSekolahExport implements FromCollection, WithHeadings, WithProperties
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return \App\Models\RankingSekolah::with('sekolah.gugus.kecamatan')->get()->sortByDesc('avg_nilai')->values()
            ->map(function ($item, $key) {
                return [
                    'sekolah' => $item->sekolah->nama,
                    'npsn' => $item->sekolah->npsn,
                    'jumlah_siswa' => $item->jumlah_siswa,
                    'kecamatan' => $item->sekolah->gugus->kecamatan->nama,
                    'pabp' => $item->AVG_PABP,
                    'pendidikan_pancasila' => $item->AVG_PENDIDIKAN_PANCASILA,
                    'ipas' => $item->AVG_IPAS,
                    'bahasa_jawa' => $item->AVG_BAHASA_JAWA,
                    'bahasa_indonesia' => $item->AVG_BAHASA_INDONESIA,
                    'seni_budaya' => $item->AVG_SENI_BUDAYA,
                    'bahasa_inggris' => $item->AVG_BAHASA_INGGRIS,
                    'pjok' => $item->AVG_PJOK,
                    'matematika' => $item->AVG_MATEMATIKA,
                    'avg_nilai' => $item->avg_nilai,
                    'ranking' => $key + 1,
                ];
            });
    }

    public function headings(): array
    {
        return [
            'Sekolah',
            'NPSN',
            'Jumlah Siswa',
            'Kecamatan',
            'PABP',
            'PENDIDIKAN PANCASILA',
            'IPAS',
            'BAHASA JAWA',
            'BAHASA INDONESIA',
            'SENI BUDAYA',
            'BAHASA INGGRIS',
            'PJOK',
            'MATEMATIKA',
            'Rata-rata Nilai',
            'Ranking',
        ];
    }

    public function properties(): array
    {
        return [
            'creator' => 'Patrick Brouwers',
            'title' => 'Ranking Sekolah Export',
            'description' => 'Ranking Sekolah Terbaru',
            'subject' => 'Ranking Sekolah',
            'keywords' => 'ranking,sekolah,export,spreadsheet',
            'category' => 'Ranking Sekolah',
            'company' => 'Dinas Pendidikan, Pemuda dan Olahraga Kabupaten Trenggalek',
        ];
    }
}
