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
        return [
            'gugus' => $this->faker->numberBetween(1, 5),
            'kecamatan_id' => \App\Models\Kecamatan::inRandomOrder()->first()->id,
        ];
    }
}
