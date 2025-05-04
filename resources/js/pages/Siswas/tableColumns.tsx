import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { SiswaController } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { Cog } from 'lucide-react';

export const columns: ColumnDef<SiswaController>[] = [
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
        accessorKey: 'kelamin',
        header: ({ column }) => <DataTableColumnHeader column={column} title="L/P" />,
    },
    {
        accessorKey: 'nisn',
        header: ({ column }) => <DataTableColumnHeader column={column} title="NISN" />,
    },
    {
        accessorKey: 'nama_sekolah',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Sekolah" />,
    },
    {
        accessorKey: 'npsn_sekolah',
        header: ({ column }) => <DataTableColumnHeader column={column} title="NPSN" />,
    },
    {
        accessorKey: 'nama_kecamatan',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Kecamatan" />,
    },
    {
        accessorKey: 'id',
        header: () => <></>,
        cell: ({ row }) => {
            return (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost">
                                <Cog />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Edit Data Siswa {row.getValue('id')}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        },
    },
];
