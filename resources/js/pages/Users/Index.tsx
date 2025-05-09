import { DataTable } from '@/components/data-table';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, User } from '@/types';
import { Head } from '@inertiajs/react';
import { columns } from './tableColumns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Administrator',
        href: '#',
    },
    {
        title: 'User',
        href: '/users',
    },
];

export default function Index({ users }: { users: User[] }) {
    console.log(users);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl md:min-h-min">
                    <DataTable columns={columns} data={users} />
                </div>
            </div>
        </AppLayout>
    );
}
