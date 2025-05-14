<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithProperties;

class RankingSiswaExport implements FromCollection, WithHeadings, WithProperties
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return \App\Models\RankingSiswa::with('siswa.sekolah.gugus.kecamatan')->get()->sortByDesc('avg_nilai')->values()
            ->map(function ($item, $key) {
                return [
                    'nama' => $item->siswa->nama,
                    'nisn' => $item->siswa->nisn,
                    'sekolah' => $item->siswa->sekolah->nama,
                    'npsn' => $item->siswa->sekolah->npsn,
                    'kecamatan' => $item->siswa->sekolah->gugus->kecamatan->nama,
                    'pabp' => $item->PABP,
                    'pendidikan_pancasila' => $item->PENDIDIKAN_PANCASILA,
                    'ipas' => $item->IPAS,
                    'bahasa_jawa' => $item->BAHASA_JAWA,
                    'bahasa_indonesia' => $item->BAHASA_INDONESIA,
                    'seni_budaya' => $item->SENI_BUDAYA,
                    'bahasa_inggris' => $item->BAHASA_INGGRIS,
                    'pjok' => $item->PJOK,
                    'matematika' => $item->MATEMATIKA,
                    'avg_nilai' => $item->avg_nilai,
                    'ranking' => $key + 1,
                ];
            });
    }

    public function headings(): array
    {
        return [
            'Nama Siswa',
            'NISN',
            'Sekolah',
            'NPSN',
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
            'title' => 'Ranking Siswa Export',
            'description' => 'Ranking Siswa Terbaru',
            'subject' => 'Ranking Siswa',
            'keywords' => 'ranking,siswa,export,spreadsheet',
            'category' => 'Ranking Siswa',
            'company' => 'Dinas Pendidikan, Pemuda dan Olahraga Kabupaten Trenggalek',
        ];
    }
}
