<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Siswa>
 */
class SiswaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nama' => $this->faker->name(),
            'kelamin' => $this->faker->randomElement(['L', 'P']),
            'nisn' => $this->faker->unique()->numerify('########'),
            'sekolah_id' => \App\Models\Sekolah::inRandomOrder()->first()->id,
        ];
    }
}
