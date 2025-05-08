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
            'siswas' => \App\Models\Siswa::with('sekolah')
                ->get()
                ->map(function ($siswa) {
                    $siswa->nama_sekolah = $siswa->sekolah->nama;
                    $siswa->npsn_sekolah = $siswa->sekolah->npsn;
                    $siswa->nama_kecamatan = $siswa->sekolah->kecamatan->nama;
                    unset($siswa->sekolah);
                    unset($siswa->sekolah_id);
                    unset($siswa->kecamatan);
                    unset($siswa->kecamatan_id);
                    return $siswa;
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

    public function import(Request $request)
    {
        $request->validate([
            'dataSiswa' => 'required|mimes:csv,xls,xlsx'
        ]);
        $file = $request->file('dataSiswa');
        $nama_file = rand(0, 100) . '_Data_Siswa.' . $file->getClientOriginalExtension();
        $file->move('siswas', $nama_file);
        $file_path = public_path("siswas/{$nama_file}");
        Excel::import(new SiswaImport(), $file_path);
        // Delete the file after import
        unlink(public_path('/siswas/' . $nama_file));
        // Add a flash message
        return redirect()->route('siswas.index')->with('success', 'Data Siswa berhasil diimport');
    }
}
