<?php

namespace Database\Seeders;

use App\Models\User;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Role::create(['name' => 'Admin']);
        Role::create(['name' => 'Dinas']);
        Role::create(['name' => 'Operator']);
        Role::create(['name' => 'Korektor']);

        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@admin.com',
            'password' => bcrypt('password'),
        ])->assignRole('Admin');

        // User::factory(20)->create();

        $korektor = User::factory()->create([
            'name' => 'Korektor User',
            'email' => 'korektor@korektor.com',
            'password' => bcrypt('password'),
        ])->assignRole('Korektor')->id;

        $kecamatans = ['Panggul', 'Munjungan', 'Pule', 'Dongko', 'Tugu', 'Karangan', 'Kampak', 'Watulimo', 'Bendungan', 'Gandusari', 'Trenggalek', 'Pogalan', 'Durenan', 'Suruh'];
        foreach ($kecamatans as $kecamatan) {
            \App\Models\Kecamatan::factory()->create([
                'nama' => $kecamatan,
            ]);
        }

        $subjects = ['PABP', 'PENDIDIKAN PANCASILA', 'IPAS', 'BAHASA JAWA', 'BAHASA INDONESIA', 'SENI BUDAYA', 'BAHASA INGGRIS', 'PJOK', 'MATEMATIKA'];
        foreach ($subjects as $subject) {
            \App\Models\Mapel::factory()->create([
                'nama' => $subject,
                'active' => true,
            ]);
        }

        // \App\Models\UserProfile::factory(21)->create();

        $guguses = [
            1 => 4,
            2 => 3,
            3 => 4,
            4 => 4,
            5 => 3,
            6 => 2,
            7 => 2,
            8 => 3,
            9 => 2,
            10 => 3,
            11 => 3,
            12 => 2,
            13 => 3,
            14 => 2,
        ];
        foreach ($guguses as $kecamatan_id => $gugus) {
            for ($i = 1; $i <= $gugus; $i++) {
                \App\Models\Gugus::factory()->create([
                    'gugus' => $i,
                    'kecamatan_id' => $kecamatan_id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }


//        \App\Models\Gugus::factory(40)->create();

//        \App\Models\Sekolah::factory(50)->create();
//
//        \App\Models\Siswa::factory(250)->create();
//
//        \App\Models\Nilai::factory(250*5)->create(); // siswa * 9

        \App\Models\UserProfile::factory()->create([
            'user_id' => $korektor,
            'guguses_id' => \App\Models\Gugus::inRandomOrder()->first()->id,
            'kecamatan_id' => \App\Models\Kecamatan::inRandomOrder()->first()->id,
        ]);
    }
}
