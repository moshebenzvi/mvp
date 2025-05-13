<?php

namespace App\Http\Controllers;

use App\Imports\SiswaImport;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;


class SiswaController extends Controller
{
    public function index()
    {
        return inertia('Siswas/Index', [
            'siswas' => \App\Models\Siswa::with('sekolah.gugus.kecamatan', 'nilais.mapel')->get()
                ->map(function ($siswa) {
                    return [
                        'id' => $siswa->id,
                        'nama' => $siswa->nama,
                        'kelamin' => $siswa->kelamin,
                        'nisn' => strlen($siswa->nisn) === 9 ? '0' . $siswa->nisn : $siswa->nisn,
                        'sekolah' => $siswa->sekolah->nama,
                        'npsn' => $siswa->sekolah->npsn,
                        'kecamatan' => $siswa->sekolah->gugus->kecamatan->nama,
                        'nilais' => $siswa->nilais->map(function ($nilai) {
                            return [
                                'id' => $nilai->id,
                                'siswa_id' => $nilai->siswa_id,
                                'mapel_id' => $nilai->mapel_id,
                                'mapel' => $nilai->mapel->nama,
                                'nilai' => $nilai->nilai,
                            ];
                        })
                    ];
                })
        ]);
    }

    public function refresh(Request $request): JsonResponse
    {
        $sekolahId = $request->query('sekolah_id');
        $mapelId = $request->query('mapel_id');

        // Get the school with its students and their grades for the specified mapel
        $school = \App\Models\Sekolah::with([
            'siswas.nilais' => function ($query) use ($mapelId) {
                $query->where('mapel_id', $mapelId);
            }
        ])->find($sekolahId);

        if (!$school) {
            return response()->json([], 404);
        }

        return response()->json($school->siswas);
    }
}
