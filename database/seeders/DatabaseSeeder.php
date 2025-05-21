<?php

namespace Database\Seeders;

use App\Imports\UsersImport;
use App\Models\User;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\SekolahImport;
use App\Imports\SiswaImport;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Role::create(['name' => 'Admin']);
        Role::create(['name' => 'Dinas']);
        Role::create(['name' => 'Operator Sekolah']);
        Role::create(['name' => 'Operator Kecamatan']);

        $kecamatans = ['Bendungan', 'Dongko', 'Durenan', 'Gandusari', 'Kampak', 'Karangan', 'Munjungan', 'Panggul', 'Pogalan', 'Pule', 'Suruh', 'Trenggalek', 'Tugu', 'Watulimo'];
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

        $guguses = [
            1 => 2,
            2 => 4,
            3 => 3,
            4 => 3,
            5 => 2,
            6 => 2,
            7 => 3,
            8 => 4,
            9 => 2,
            10 => 4,
            11 => 2,
            12 => 3,
            13 => 3,
            14 => 3,
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

        // \App\Models\Sekolah::factory(3)->create();
        Excel::import(new SekolahImport(), public_path('/import/Data_Sekolah.xlsx'));

        // \App\Models\Siswa::factory(9)->create();
        Excel::import(new SiswaImport(), public_path('/import/Data_Siswa.xlsx'));

        // User::factory()->create([
        //     'username' => 'admin',
        //     'name' => 'Admin User',
        //     // 'email' => 'admin@admin.com',
        //     'password' => bcrypt('admin'),
        // ])->assignRole('Admin');

        // $operator_kecamatan = User::factory()->create([
        //     'username' => 'operator_kecamatan',
        //     'gugus_id' => \App\Models\Sekolah::inRandomOrder()->first()->gugus_id,
        //     'name' => 'Operator Kecamatan User',
        //     // 'email' => 'operator_kecamatan@operator_kecamatan.com',
        //     'password' => bcrypt('operator_kecamatan'),
        // ])->assignRole('Operator Kecamatan')->id;

        // $dinas = User::factory()->create([
        //     'username' => 'dinas',
        //     'name' => 'Dinas User',
        //     // 'email' => 'dinas@dinas.com',
        //     'password' => bcrypt('dinas'),
        // ])->assignRole('Dinas')->id;

        // $operator = User::factory()->create([
        //     'username' => 'operator_sekolah',
        //     'name' => 'Operator User',
        //     // 'email' => 'operator@operator.com',
        //     'password' => bcrypt('operator_sekolah'),
        // ])->assignRole('Operator Sekolah')->id;

        Excel::import(new UsersImport(), public_path('/import/Data_User.xlsx'));

        // \App\Models\Nilai::factory(9*9)->create(); // siswa * 9

        // \App\Models\Aktifitas::factory(20)->create();

        // $this->call(NilaiSeeder::class);
    }
}
