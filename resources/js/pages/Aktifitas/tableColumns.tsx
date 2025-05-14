import { DataTableColumnHeader } from '@/components/data-table-column-header';
import type { User } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => <DataTableColumnHeader column={column} title="No" />,
        cell: ({ row }) => {
            return <div className="text-center">{row.getValue('id')}</div>;
        },
    },
    {
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nama" />,
    },
    {
        accessorKey: 'username',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Username" />,
    },
    {
        accessorKey: 'aktifitas',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Aktifitas" />,
    },
    {
        accessorKey: 'created_at',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Timestamp" />,
        cell: ({ row }) => {
            return <div>{new Date(row.getValue('created_at')).toLocaleString()}</div>;
        },
    },
];
