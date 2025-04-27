import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react'
import type { BreadcrumbItem, MapelController } from '@/types';
import { DataTable } from '@/components/data-table';
import { columns } from '@/pages/Mapels/tableColumns';

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

export default function Index({ mapels }: { mapels: MapelController[]}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mata Pelajaran"/>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl md:min-h-min">
                    <DataTable columns={columns} data={mapels} filterData='nama' />
                </div>
            </div>
        </AppLayout>
    )
}
