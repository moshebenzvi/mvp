import { DataTable } from '@/components/data-table';
import AppLayout from '@/layouts/app-layout';
import { columns } from '@/pages/Aktifitas/tableColumns';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Administrator',
        href: '#',
    },
    {
        title: 'Log Activity',
        href: '/aktifitas',
    },
];

export default function Index({ aktifitas }: { aktifitas: any }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Log Activity" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl md:min-h-min">
                    <DataTable columns={columns} data={aktifitas} title={'Log Activity'} />
                </div>
            </div>
        </AppLayout>
    );
}
