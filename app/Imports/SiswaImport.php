<?php

namespace App\Imports;

use App\Models\Siswa;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class SiswaImport implements ToModel, WithHeadingRow
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new Siswa([
            'nama' => $row['nama'],
            'kelamin' => $row['kelamin'],
            'nisn' => $row['nisn'],
            'sekolah_id' => \App\Models\Sekolah::where('npsn', '=', $row['npsn'])->first()?->id ?? 0,
        ]);
    }
}
