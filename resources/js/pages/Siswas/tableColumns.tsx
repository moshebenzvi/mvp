import { type SiswaController } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/data-table-column-header';

export const columns: ColumnDef<SiswaController>[] = [
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
        accessorKey: 'nisn',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="NISN" />
        ),
    },
    {
        accessorKey: 'nama_sekolah',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Sekolah" />
        ),
    },
    {
        accessorKey: 'npsn_sekolah',
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
];
