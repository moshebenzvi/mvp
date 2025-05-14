import { DataTableColumnHeader } from '@/components/data-table-column-header';
import type { Sekolah } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Sekolah>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => <DataTableColumnHeader column={column} title="No" />,
        cell: ({ row }) => {
            return <div className="text-center">{row.getValue('id')}</div>;
        },
    },
    {
        accessorKey: 'nama',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nama" />,
    },
    {
        accessorKey: 'npsn',
        header: ({ column }) => <DataTableColumnHeader column={column} title="NPSN" />,
    },
    {
        accessorKey: 'kecamatan',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Kecamatan" />,
    },
    {
        accessorKey: 'gugus',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Gugus" />,
    },
    {
        accessorKey: 'siswas_count',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Jumlah Siswa" />,
    },
];
