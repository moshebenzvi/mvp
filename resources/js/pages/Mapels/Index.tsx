import { DataTable } from '@/components/data-table';
import AppLayout from '@/layouts/app-layout';
import { columns } from '@/pages/Mapels/tableColumns';
import type { BreadcrumbItem, Mapel } from '@/types';
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

export default function Index({ mapels }: { mapels: Mapel[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mata Pelajaran" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid grid-rows-1 gap-4 rounded-xl md:grid-cols-5">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative col-span-3 overflow-hidden rounded-xl">
                        <DataTable columns={columns} data={mapels} title={'Mata Pelajaran'} />
                    </div>
                    <div className="col-start-4"></div>
                </div>
            </div>
        </AppLayout>
    );
}
