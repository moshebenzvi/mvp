import type { UserController } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/data-table-column-header';

export const columns: ColumnDef<UserController>[] = [
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
        accessorKey: 'name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nama" />
        ),
    },
    {
        accessorKey: 'email',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
    },
    {
        accessorKey: 'kecamatan',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Kecamatan" />
        ),
    },
    {
        accessorKey: 'gugus',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Gugus" />
        ),
        cell: ({ row }) => {
            return <div className="text-center">{row.getValue('gugus')}</div>;
        },
    },
    {
        accessorKey: 'role',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Role" />
        ),
    },
];
