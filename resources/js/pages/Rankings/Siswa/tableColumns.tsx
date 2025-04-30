import { DataTableColumnHeader } from '@/components/data-table-column-header';
import type { RangkingSiswaController } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<RangkingSiswaController>[] = [
    {
        accessorKey: 'siswa_id',
        header: ({ column }) => <DataTableColumnHeader column={column} title="No" />,
        cell: ({ row }) => {
            return <div className="text-center">{row.getValue('siswa_id')}</div>;
        },
    },
    {
        accessorKey: 'siswa_nama',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nama" />,
    },
    {
        accessorKey: 'nisn',
        header: ({ column }) => <DataTableColumnHeader column={column} title="NISN" />,
    },
    {
        accessorKey: 'sekolah_nama',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Sekolah" />,
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
        accessorKey: 'avg_nilai',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nilai" />,
    },
];
