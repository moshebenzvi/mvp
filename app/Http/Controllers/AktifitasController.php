<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AktifitasController extends Controller
{
    public function index()
    {
        return inertia('Aktifitas/Index', [
            'aktifitas' => \App\Models\Aktifitas::with('user')->get()
            ->map(function ($aktifitas) {
                return [
                    'id' => $aktifitas->id,
                    'name' => $aktifitas->user->name,
                    'email' => $aktifitas->user->email,
                    'aktifitas' => $aktifitas->aktifitas,
                    'created_at' => $aktifitas->created_at,
                ];
            }),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => ['required', 'exists:users'],
            'aktifitas' => ['required'],
        ]);

        return Aktifitas::create($data);
    }

    public function show(Aktifitas $aktifitas)
    {
        return $aktifitas;
    }

    public function update(Request $request, Aktifitas $aktifitas)
    {
        $data = $request->validate([
            'user_id' => ['required', 'exists:users'],
            'aktifitas' => ['required'],
        ]);

        $aktifitas->update($data);

        return $aktifitas;
    }

    public function destroy(Aktifitas $aktifitas)
    {
        $aktifitas->delete();

        return response()->json();
    }
}
