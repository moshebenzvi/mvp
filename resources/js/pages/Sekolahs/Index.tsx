import { DataTable } from '@/components/data-table';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, SekolahController } from '@/types';
import { Head } from '@inertiajs/react';
import { columns } from './tableColumns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Administrator',
        href: '#',
    },
    {
        title: 'Sekolah',
        href: '/sekolahs',
    },
];

export default function Index({ sekolahs }: { sekolahs: SekolahController[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sekolah" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl md:min-h-min">
                    <DataTable columns={columns} data={sekolahs} title={'Data Sekolah'} />
                </div>
            </div>
        </AppLayout>
    );
}
