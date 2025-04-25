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
            'password' => bcrypt('2XW5dfBjdWgqmLX'),
        ])->assignRole('Admin');

        User::factory(20)->create();

        $kecamatans = ['Panggul', 'Munjungan', 'Pule', 'Dongko', 'Tugu', 'Karangan', 'Kampak', 'Watulimo', 'Bendungan', 'Gandusari', 'Trenggalek', 'Pogalan', 'Durenan', 'Suruh'];
        foreach ($kecamatans as $kecamatan) {
            \App\Models\Kecamatan::factory()->create([
                'nama' => $kecamatan,
            ]);
        }

        \App\Models\Gugus::factory(10)->create();

        $subjects = ['PABP', 'PENDIDIKAN PANCASILA', 'IPAS', 'BAHASA JAWA', 'BAHASA INDONESIA', 'SENI BUDAYA', 'BAHASA INGGRIS', 'PJOK', 'MATEMATIKA'];
        foreach ($subjects as $subject) {
            \App\Models\Mapel::factory()->create([
                'nama' => $subject,
                'active' => true,
            ]);
        }

        \App\Models\UserProfile::factory(10)->create();
    }
}
