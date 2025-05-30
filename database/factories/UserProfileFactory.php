<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserProfile>
 */
class UserProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::inRandomOrder()->first()->id,
            'guguses_id' => \App\Models\Gugus::inRandomOrder()->first()->id,
            'kecamatan_id' => \App\Models\Kecamatan::inRandomOrder()->first()->id,
        ];
    }
}
