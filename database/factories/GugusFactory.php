<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Gugus>
 */
class GugusFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        static $combinations = null;

        if ($combinations === null) {
            $kecamatanIds = \App\Models\Kecamatan::pluck('id')->toArray();
            $combinations = collect($kecamatanIds)
                ->crossJoin(range(1, 3)) // Generate all combinations of kecamatan_id and gugus
                ->shuffle(); // Randomize the order
        }

        if ($combinations->isEmpty()) {
            throw new \Exception('No more unique combinations available.');
        }

        [$kecamatan_id, $gugus] = $combinations->pop();

        return [
            'gugus' => $gugus,
            'kecamatan_id' => $kecamatan_id,
        ];
    }
}
