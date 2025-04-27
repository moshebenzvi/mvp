import { type SekolahController } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/data-table-column-header';

export const columns: ColumnDef<SekolahController>[] = [
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
        accessorKey: 'npsn',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="NPSN" />
        ),
    },
    {
        accessorKey: 'nama_kecamatan',
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
            return <div className="text-center">{row.getValue('id')}</div>;
        },
    }
];
