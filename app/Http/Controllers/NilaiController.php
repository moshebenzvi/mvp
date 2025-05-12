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

            \App\Models\Nilai::create($validated);
        }
        return redirect('nilais')->with('success', 'Nilai berhasil ditambahkan.');
        // return redirect()->back()->with('success', 'Nilai berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nilais' => 'required|array',
            'nilais.*.id' => 'required|exists:nilais,id',
            'nilais.*.nilai' => 'required|numeric|min:0|max:100',
        ]);

        foreach ($request->nilais as $nilaiData) {
            \App\Models\Nilai::where('id', $nilaiData['id'])
                ->update(['nilai' => $nilaiData['nilai']]);
        }

        return redirect()->route('siswas.index')->with('success', 'Nilai berhasil diupdate.');
    }

    public function destroy($id)
    {
        \App\Models\Nilai::where('siswa_id', $id)->first()->delete();
        return redirect()->route('siswas.index')->with('success', 'Nilai berhasil dihapus.');
    }

}
