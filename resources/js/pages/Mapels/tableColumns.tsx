import { type MapelController } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { Switch } from "@/components/ui/switch"
import { router } from '@inertiajs/react';

export const columns: ColumnDef<MapelController>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="No" />
        ),
        cell: ({ row }) => {
            return <div className="text-center">{row.getValue('id')}</div>;
        },
    },
    {
        accessorKey: 'nama',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nama" />
        ),
    },
    {
        accessorKey: 'active',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Active" />
        ),
        cell: ({ row }) => {
            const id = row.getValue<number>('id');
            const isActive = row.getValue<boolean>('active');

            const updateMapel = (checked: boolean) => {
                router.post(`/mapels/${id}`, {
                    _method: 'PUT', // Specify the HTTP method override
                    active: checked, // Pass the updated active state
                }, {
                    preserveScroll: true, // Optional: Preserve scroll position
                    onSuccess: () => console.log('Mapel updated successfully'),
                    onError: (errors) => console.error('Error updating mapel:', errors),
                });
            };
            return (
                <div className="text-center">
                    <Switch
                        checked={isActive}
                        onCheckedChange={updateMapel}
                    />
                </div>
            );                   
        },
    }
];
