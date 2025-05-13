<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class RankingSekolahController extends Controller
{

    public function index()
    {
        $rankings = \App\Models\RankingSekolah::with('sekolah.gugus.kecamatan')->get()
            ->map(function ($ranking_sekolah) {
                return [
                    'sekolah_id' => $ranking_sekolah->sekolah_id,
                    'sekolah' => $ranking_sekolah->sekolah->nama,
                    'npsn' => $ranking_sekolah->sekolah->npsn,
                    'kecamatan' => $ranking_sekolah->sekolah->gugus->kecamatan->nama,
                    'gugus' => $ranking_sekolah->sekolah->gugus->gugus,
                    'avg_nilai' => $ranking_sekolah->avg_nilai ?? 0,
                ];
            });

        return inertia('Rankings/Sekolah/Index', [
            'rankings' => $rankings,
        ]);
    }

    public function download()
    {
        return Excel::download(new \App\Exports\RankingSekolahExport(), 'Ranking Sekolah '.now().'.xlsx');
    }
}
