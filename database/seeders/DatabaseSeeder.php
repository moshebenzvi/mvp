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

        \App\Models\Gugus::factory(40)->create();

        $subjects = ['PABP', 'PENDIDIKAN PANCASILA', 'IPAS', 'BAHASA JAWA', 'BAHASA INDONESIA', 'SENI BUDAYA', 'BAHASA INGGRIS', 'PJOK', 'MATEMATIKA'];
        foreach ($subjects as $subject) {
            \App\Models\Mapel::factory()->create([
                'nama' => $subject,
                'active' => true,
            ]);
        }

        // \App\Models\UserProfile::factory(21)->create();

        \App\Models\Sekolah::factory(478)->create();

        \App\Models\Siswa::factory(1000)->create();

        \App\Models\UserProfile::factory()->create([
            'user_id' => $korektor,
            'guguses_id' => \App\Models\Gugus::inRandomOrder()->first()->id,
            'kecamatan_id' => \App\Models\Kecamatan::inRandomOrder()->first()->id,
        ]);

        \App\Models\Nilai::factory(2000)->create();
    }
}
