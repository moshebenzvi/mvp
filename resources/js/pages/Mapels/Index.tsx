import { DataTable } from '@/components/data-table';
import AppLayout from '@/layouts/app-layout';
import { columns } from '@/pages/Mapels/tableColumns';
import type { BreadcrumbItem, MapelController } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Administrator',
        href: '#',
    },
    {
        title: 'Mata Pelajaran',
        href: '/mapels',
    },
];

export default function Index({ mapels }: { mapels: MapelController[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mata Pelajaran" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl">
                        <DataTable columns={columns} data={mapels} filterData="nama" />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
