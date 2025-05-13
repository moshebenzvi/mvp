<?php

namespace App\Http\Controllers;

use App\Models\Nilai;
use Illuminate\Http\Request;

class NilaiController extends Controller
{
    public function index()
    {
        $korektor = auth()->user()->unsetRelation('roles')->load('gugus.kecamatan');
        $sekolah = \App\Models\Sekolah::where('gugus_id', $korektor->gugus_id)->get();
        $mapel = \App\Models\Mapel::active()->get();

        return inertia('Nilais/Index', [
            'korektor' => $korektor,
            'mapels' => $mapel,
            'sekolah' => $sekolah,
        ]);
    }

    public function store(Request $request)
    {
        $submissionData = $request->input('submissionData');

        foreach ($submissionData as $data) {
            $validated = \Validator::make($data, [
                'siswa_id' => 'required|exists:siswas,id',
                'mapel_id' => 'required|exists:mapels,id',
                'nilai' => 'required|numeric|min:0|max:100',
            ])->validate();

            $siswa = \App\Models\Siswa::with('sekolah')->findOrFail($validated['siswa_id']);
            $mapel = \App\Models\Mapel::findOrFail($validated['mapel_id']);
            \App\Models\Aktifitas::create([
                'user_id' => auth()->user()->id,
                'aktifitas' => 'Input nilai '. $siswa->nama . ' (' . $siswa->nisn . ') dari ' . $siswa->sekolah->nama. ' (' . $siswa->sekolah->npsn . ')' . '. Mapel ' . $mapel->nama . ' dengan nilai: '. $validated['nilai'],
            ]);

            \App\Models\Nilai::create($validated);
        }
//        return redirect('nilais')->with('success', 'Nilai berhasil ditambahkan.');
        // return redirect()->back()->with('success', 'Nilai berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nilais' => 'required|array',
            'nilais.*.id' => 'required|exists:nilais,id',
            'nilais.*.nilai' => 'required|numeric|min:0|max:100',
        ]);

        foreach ($request->nilais as $nilai) {
            $nilaiData = \App\Models\Nilai::findOrFail($nilai['id']);
            if ($nilaiData->nilai !== $nilai['nilai']) {
                $siswa = \App\Models\Siswa::with('sekolah')->findOrFail($nilaiData['siswa_id']);
                $mapel = \App\Models\Mapel::findOrFail($nilaiData['mapel_id']);
                \App\Models\Aktifitas::create([
                    'user_id' => auth()->user()->id,
                    'aktifitas' => 'Update nilai '. $siswa->nama . ' (' . $siswa->nisn . ') dari ' . $siswa->sekolah->nama. ' (' . $siswa->sekolah->npsn . ')' . '. Mapel ' . $mapel->nama . ' dari nilai: '. $nilaiData['nilai']. ' menjadi: '. $nilai['nilai'],
                ]);

                \App\Models\Nilai::where('id', $nilai['id'])->update(['nilai' => $nilai['nilai']]);

            }
        }

        return redirect()->route('siswas.index')->with('success', 'Nilai berhasil diupdate.');
    }

    public function destroy($id)
    {
        $siswa = \App\Models\Siswa::with('sekolah')->findOrFail($id);
        $nilais = \App\Models\Nilai::where('siswa_id', $id)->get();
        foreach ($nilais as $nilai) {
            $mapel = \App\Models\Mapel::findOrFail($nilai['mapel_id']);
            \App\Models\Aktifitas::create([
                'user_id' => auth()->user()->id,
                'aktifitas' => 'Hapus nilai '. $siswa->nama . ' (' . $siswa->nisn . ') dari ' . $siswa->sekolah->nama. ' (' . $siswa->sekolah->npsn . ')' . '. Mapel ' . $mapel->nama . ' dengan nilai: '. $nilai['nilai'],
            ]);
        }
        \App\Models\Nilai::where('siswa_id', $id)->first()->delete();
        return redirect()->route('siswas.index')->with('success', 'Nilai berhasil dihapus.');
    }

}
