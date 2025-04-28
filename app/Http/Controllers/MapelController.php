<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MapelController extends Controller
{
    public function index()
    {
        return inertia('Mapels/Index', [
            'mapels' => \App\Models\Mapel::all()
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'active' => 'required|boolean',
        ]);

        $mapel = \App\Models\Mapel::findOrFail($id);
        $mapel->update(['active' => $validated['active']]); // Update only the 'active' field

        return redirect()->route('mapels.index')->with('success', 'Mapel updated successfully.');
    }
}
