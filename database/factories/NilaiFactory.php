<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Nilai>
 */
class NilaiFactory extends Factory
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
            $siswaIds = \App\Models\Siswa::pluck('id')->toArray();
            $mapelIds = \App\Models\Mapel::pluck('id')->toArray();

            // Generate all possible unique combinations of siswa_id and mapel_id
            $combinations = collect($siswaIds)
                ->crossJoin($mapelIds)
                ->shuffle(); // Randomize the order
        }

        if ($combinations->isEmpty()) {
            throw new \Exception('No more unique combinations available.');
        }

        [$siswa_id, $mapel_id] = $combinations->pop();

        return [
            'siswa_id' => $siswa_id,
            'mapel_id' => $mapel_id,
            'nilai' => $this->faker->randomFloat(2, 0, 100),
        ];
    }
}
