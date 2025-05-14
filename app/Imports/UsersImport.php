<?php
namespace App\Imports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Role;
use Maatwebsite\Excel\Events\AfterImport;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\RegistersEventListeners;

class UsersImport implements ToModel, WithHeadingRow
{
    public function model(array $row): ?Model
    {
        // Create the user
        $user = new User([
            'name' => $row['name'],
            'username' => $row['username'],
            'password' => bcrypt($row['password']),
            'email_verified_at' => now(),
            'gugus_id' => $row['gugus_id'] ?? null,
        ]);

        $user->save();

        // Assign a role to the user
        if (!empty($row['role'])) {
            $role = Role::findByName($row['role']);
            if ($role) {
                $user->assignRole($role);
            }
        }

        return $user;
    }
}
