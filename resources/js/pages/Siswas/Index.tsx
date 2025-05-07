import { DataTable } from '@/components/data-table';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, SiswaController } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import React, { FormEventHandler } from 'react';
import { columns } from './tableColumns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Administrator',
        href: '#',
    },
    {
        title: 'Siswa',
        href: '/siswas',
    },
];

export default function Index({ siswas }: { siswas: SiswaController[] }) {
    const { data, setData, post, processing, reset, errors, clearErrors } = useForm<{ dataSiswa: File | null }>({
        dataSiswa: null,
    });
    
    const [open, setOpen] = React.useState(false);
    const uploadSiswa: FormEventHandler = (e) => {
        e.preventDefault();
        if (!data.dataSiswa) {
            console.error('No file selected');
            return;
        }
        post(route('siswas.import'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
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
            <Head title="Siswa" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl md:min-h-min">
                    <DataTable columns={columns} data={siswas} title={'Data Siswa'} />
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>Upload Data Siswa</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>Upload Data Siswa</DialogTitle>
                        <DialogDescription>
                            Upload file XLSX.
                            <br />
                            Row: Nama Siswa, Kelamin (L/P), NISN, Sekolah ID.
                            <br />
                            Column pertama berisi data, tanpa ada judul atau header.
                        </DialogDescription>
                        <form className="space-y-6" onSubmit={uploadSiswa}>
                            <div className="grid gap-2">
                                <Label htmlFor="dataSekolah" className="sr-only">
                                    Upload Data Siswa
                                </Label>

                                <Input
                                    id="dataSiswa"
                                    type="file"
                                    name="dataSiswa"
                                    onChange={(e) => setData('dataSiswa', e.target.files?.[0] || null)}
                                    placeholder="Upload Data Siswa"
                                />

                                <InputError message={errors.dataSiswa} />
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
