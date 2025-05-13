<?php

namespace App\Http\Controllers;

use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\Request;

class RankingSiswaController extends Controller
{
    public function index()
    {
        $rankings = \App\Models\RankingSiswa::with('siswa', 'sekolah', 'sekolah.gugus.kecamatan')->get()
            ->map(function ($ranking_siswa) {
                return [
                    'siswa_id' => $ranking_siswa->siswa_id,
                    'siswa_nama' => $ranking_siswa->siswa->nama,
                    'nisn' => strlen($ranking_siswa->siswa->nisn) === 9 ? '0' . $ranking_siswa->siswa->nisn : $ranking_siswa->siswa->nisn,
                    'sekolah_nama' => $ranking_siswa->sekolah->nama,
                    'npsn' => $ranking_siswa->sekolah->npsn,
                    'kecamatan' => $ranking_siswa->sekolah->gugus->kecamatan->nama,
                    'avg_nilai' => $ranking_siswa->avg_nilai ?? 0,
                ];
            });

        return inertia('Rankings/Siswa/Index', [
            'rankings' => $rankings,
        ]);
    }

    public function download()
    {
        return Excel::download(new \App\Exports\RankingSiswaExport(), 'Ranking Siswa '.now().'.xlsx');
    }
}
