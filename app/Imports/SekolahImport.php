<?php

namespace App\Imports;

use App\Models\Sekolah;
use Maatwebsite\Excel\Concerns\ToModel;

class SekolahImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Sekolah([
            'nama' => $row[0],
            'npsn' => $row[1],
            'guguses_id' => $row[2],
            'kecamatan_id' => $row[3],
        ]);
    }
}
