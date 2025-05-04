import { DataTable } from '@/components/data-table';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, SekolahController } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { columns } from './tableColumns';
import React from 'react';

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
    const { data, setData, post, processing, reset, errors, clearErrors } = useForm<{ dataSekolah: File | null }>({
        dataSekolah: null,
    });
	const [open, setOpen] = React.useState(false);
    const uploadSekolah: FormEventHandler = (e) => {
        e.preventDefault();
        if (!data.dataSekolah) {
            console.error('No file selected');
            return;
        }
        post(route('sekolahs.import'), {
            preserveScroll: true,
            onSuccess: () => setOpen(false),
            onFinish: () => reset(),
            forceFormData: true,
        });
    };
    const closeModal = () => {
        clearErrors();
        reset();
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sekolah" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl md:min-h-min">
                    <DataTable columns={columns} data={sekolahs} title={'Data Sekolah'} />
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>Upload Data Sekolah</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>Upload Data Sekolah</DialogTitle>
                        <DialogDescription>
                            Upload file XLSX.
                            <br />
                            Data sebelumnya akan dihapus.
                            <br />
                            Row: Nama Sekolah, NPSN, Gugus ID, Kecamatan ID.
                            <br />
                            Column pertama berisi data, tanpa ada judul atau header.
                        </DialogDescription>
                        <form className="space-y-6" onSubmit={uploadSekolah}>
                            <div className="grid gap-2">
                                <Label htmlFor="dataSekolah" className="sr-only">
                                    Upload Data Sekolah
                                </Label>

                                <Input
                                    id="dataSekolah"
                                    type="file"
                                    name="dataSekolah"
                                    onChange={(e) => setData('dataSekolah', e.target.files?.[0] || null)}
                                    placeholder="Upload Data Sekolah"
                                />

                                <InputError message={errors.dataSekolah} />
                            </div>

                            <DialogFooter className="gap-2">
                                <DialogClose asChild>
                                    <Button variant="secondary" onClick={closeModal}>
                                        Cancel
                                    </Button>
                                </DialogClose>

                                <Button disabled={processing} asChild>
                                    <button type="submit">Upload</button>
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
