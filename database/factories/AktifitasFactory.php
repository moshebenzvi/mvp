<?php

namespace Database\Factories;

use App\Models\Aktifitas;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class AktifitasFactory extends Factory
{
    protected $model = Aktifitas::class;

    public function definition(): array
    {
        return [
            'aktifitas' => $this->faker->word(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),

            'user_id' => User::factory(),
        ];
    }
}
