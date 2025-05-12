import { DataTableColumnHeader } from '@/components/data-table-column-header';
import type { SiswaController } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { router } from '@inertiajs/react';
import { Eye, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
// import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
        id: 'actions',
        cell: ({ row }) => {
            const siswa = row.original;

            return <ActionCell siswa={siswa} />;
        },
    },
];

function ActionCell({ siswa }: { siswa: SiswaController }) {
    // const router = useRouter();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showViewDialog, setShowViewDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        setDeleting(true);

        try {
            router.delete(route('nilais.destroy', siswa.id), {
                onSuccess: () => {
                    setShowDeleteDialog(false);
                    router.reload();
                },
                onError: () => {
                    console.error('Failed to delete student');
                },
                preserveScroll: true,
            });
        } catch (error) {
            console.error('Error deleting student:', error);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuItem onClick={() => setShowViewDialog(true)}>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>Lihat Nilai</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        <span>Ubah Nilai</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Hapus Nilai</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Delete Confirmation Dialog */}
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Konfirmasi Penghapusan</DialogTitle>
                        <DialogDescription>
                            Apakah anda yakin ingin menghapus data nilai siswa untuk {siswa.nama}?. <br />
                            Data ini tidak dapat dikembalikan.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                            Batal
                        </Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
                            {deleting ? 'Menghapus...' : 'Hapus'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* View Grades Dialog */}
            <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
                <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                        <DialogTitle>{siswa.nama}</DialogTitle>
                        <DialogDescription>
                            NISN: {siswa.nisn} | Sekolah: {siswa.sekolah}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="max-h-[400px] overflow-y-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Mata Pelajaran</TableHead>
                                    <TableHead className="text-right">Nilai</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {siswa.nilais.map((nilai) => (
                                    <TableRow key={nilai.id}>
                                        <TableCell>{nilai.mapel}</TableCell>
                                        <TableCell className="text-right">{nilai.nilai}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <EditStudentDialog open={showEditDialog} onOpenChange={setShowEditDialog} siswa={siswa} />
        </>
    );
}

function EditStudentDialog({ open, onOpenChange, siswa }: { open: boolean; onOpenChange: (open: boolean) => void; siswa: SiswaController }) {
    // const router = useRouter();
    const [formData, setFormData] = useState({
        id: siswa.id,
        // nama: siswa.nama,
        // kelamin: siswa.kelamin,
        // nisn: siswa.nisn,
        // sekolah: siswa.sekolah,
        // npsn: siswa.npsn,
        // kecamatan: siswa.kecamatan,
        nilais: siswa.nilais.map((nilai) => ({
            id: nilai.id,
            mapel: nilai.mapel,
            nilai: nilai.nilai,
        })),
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);

    // In your handleSubmit function:
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            router.put(`/nilais/${siswa.id}`, formData, {
                onSuccess: () => {
                    onOpenChange(false);
                    router.reload();
                },
                onError: (errors) => {
                    setErrors(errors);
                },
                preserveScroll: true,
            });
        } catch (error) {
            console.error('Error updating student:', error);
            setErrors({ form: 'Failed to update student' });
        } finally {
            setSubmitting(false);
        }
    };

    const updateNilai = (id: number, value: string) => {
        setFormData({
            ...formData,
            nilais: formData.nilais.map((nilai) => (nilai.id === id ? { ...nilai, nilai: value } : nilai)),
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Ubah Nilai Siswa</DialogTitle>
                    <DialogDescription>Update data nilai.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                        {/*
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="nama">Name</Label>
                                <Input
                                    id="nama"
                                    value={formData.nama}
                                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                                    error={errors.nama}
                                />
                                {errors.nama && <p className="text-sm text-red-500">{errors.nama}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="kelamin">Gender (L/P)</Label>
                                <Input
                                    id="kelamin"
                                    value={formData.kelamin}
                                    onChange={(e) => setFormData({ ...formData, kelamin: e.target.value })}
                                    error={errors.kelamin}
                                    maxLength={1}
                                />
                                {errors.kelamin && <p className="text-sm text-red-500">{errors.kelamin}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="nisn">NISN</Label>
                                <Input
                                    id="nisn"
                                    value={formData.nisn}
                                    onChange={(e) => setFormData({ ...formData, nisn: e.target.value })}
                                    error={errors.nisn}
                                />
                                {errors.nisn && <p className="text-sm text-red-500">{errors.nisn}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="npsn">NPSN</Label>
                                <Input
                                    id="npsn"
                                    value={formData.npsn}
                                    onChange={(e) => setFormData({ ...formData, npsn: e.target.value })}
                                    error={errors.npsn}
                                />
                                {errors.npsn && <p className="text-sm text-red-500">{errors.npsn}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="sekolah">School</Label>
                                <Input
                                    id="sekolah"
                                    value={formData.sekolah}
                                    onChange={(e) => setFormData({ ...formData, sekolah: e.target.value })}
                                    error={errors.sekolah}
                                />
                                {errors.sekolah && <p className="text-sm text-red-500">{errors.sekolah}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="kecamatan">District</Label>
                                <Input
                                    id="kecamatan"
                                    value={formData.kecamatan}
                                    onChange={(e) => setFormData({ ...formData, kecamatan: e.target.value })}
                                    error={errors.kecamatan}
                                />
                                {errors.kecamatan && <p className="text-sm text-red-500">{errors.kecamatan}</p>}
                            </div>
                        </div>
                        */}
                        <div className="grid grid-cols-2 gap-4">
                            {formData.nilais.map((nilai, index) => (
                                <div className="space-y-2" key={nilai.id}>
                                    <Label htmlFor={nilai.mapel}>{nilai.mapel}</Label>
                                    <Input
                                        type="number"
                                        value={nilai.nilai}
                                        onChange={(e) => updateNilai(nilai.id, e.target.value)}
                                        step="0.01"
                                        min="0"
                                        max="100"
                                    />
                                    {errors[`nilais.${index}.nilai`] && <p className="text-sm text-red-500">{errors[`nilais.${index}.nilai`]}</p>}
                                </div>
                            ))}
                        </div>
                        {/*
                        <div className="space-y-2">
                            <Label>Nilai</Label>
                            <div className="max-h-[200px] overflow-y-auto rounded-md border p-2">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Mata Pelajaran</TableHead>
                                            <TableHead className="text-right">Nilai</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {formData.nilais.map((nilai, index) => (
                                            <TableRow key={nilai.id}>
                                                <TableCell>{nilai.mapel}</TableCell>
                                                <TableCell className="text-right">
                                                    <Input
                                                        type="number"
                                                        value={nilai.nilai}
                                                        onChange={(e) => updateNilai(nilai.id, e.target.value)}
                                                        className="ml-auto w-24"
                                                        step="0.01"
                                                        min="0"
                                                        max="100"
                                                    />
                                                    {errors[`nilais.${index}.nilai`] && (
                                                        <p className="text-sm text-red-500">{errors[`nilais.${index}.nilai`]}</p>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                        */}
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Batal
                        </Button>
                        <Button type="submit" disabled={submitting}>
                            {submitting ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
