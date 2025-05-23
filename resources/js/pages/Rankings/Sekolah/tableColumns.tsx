import { DataTableColumnHeader } from '@/components/data-table-column-header';
import type { RangkingSekolah } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<RangkingSekolah>[] = [
    {
        accessorKey: 'sekolah_id',
        header: ({ column }) => <DataTableColumnHeader column={column} title="No" />,
        cell: ({ row }) => {
            return <div className="text-center">{row.getValue('sekolah_id')}</div>;
        },
    },
    {
        accessorKey: 'sekolah',
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
        accessorKey: 'gugus',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Gugus" />,
    },
    {
        accessorKey: 'avg_nilai',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nilai" />,
    },
];
