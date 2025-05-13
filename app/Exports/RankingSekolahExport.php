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
                    'kecamatan' => $item->sekolah->gugus->kecamatan->nama,
                    'pabp' => $item->pabp,
                    'pendidikan_pancasila' => $item->pendidikan_pancasila,
                    'ipas' => $item->ipas,
                    'bahasa_jawa' => $item->bahasa_jawa,
                    'bahasa_indonesia' => $item->bahasa_indonesia,
                    'seni_budaya' => $item->seni_budaya,
                    'bahasa_inggris' => $item->bahasa_inggris,
                    'pjok' => $item->pjok,
                    'matematika' => $item->matematika,
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
            'PABP', 'PENDIDIKAN PANCASILA', 'IPAS', 'BAHASA JAWA', 'BAHASA INDONESIA', 'SENI BUDAYA', 'BAHASA INGGRIS', 'PJOK', 'MATEMATIKA',
            'Rata-rata Nilai',
            'Ranking',
        ];
    }

    public function properties(): array
    {
        return [
            'creator'        => 'Patrick Brouwers',
            'title'          => 'Ranking Sekolah Export',
            'description'    => 'Ranking Sekolah Terbaru',
            'subject'        => 'Ranking Sekolah',
            'keywords'       => 'ranking,sekolah,export,spreadsheet',
            'category'       => 'Ranking Sekolah',
            'company'        => 'Dinas Pendidikan, Pemuda dan Olahraga Kabupaten Trenggalek',
        ];
    }
}
