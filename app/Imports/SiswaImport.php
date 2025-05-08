<?php

namespace App\Imports;

use App\Models\Siswa;
use Maatwebsite\Excel\Concerns\ToModel;

class SiswaImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Siswa([
            'nama' => $row[0],
            'kelamin' => $row[1],
            'nisn' => $row[2],
            'sekolah_id' => \App\Models\Sekolah::where('npsn', '=', $row[3])->first()?->id ?? 0,
        ]);
    }
}
