'use client';

import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, Mapel, Sekolah, SharedData, Siswa, User } from '@/types';
import { Head, router } from '@inertiajs/react';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { usePage } from '@inertiajs/react';
import { AlertCircle } from 'lucide-react';
import type React from 'react';
import { useEffect, useState } from 'react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Input Nilai',
        href: 'nilais',
    },
];

export default function Index({ korektor, mapels, sekolah }: { korektor: User; mapels: Mapel[]; sekolah: Sekolah[] }) {
    const { auth } = usePage<SharedData>().props;
    const [selectedSekolah, setSelectedSekolah] = useState<string>('');
    const [selectedMapel, setSelectedMapel] = useState<string>('');
    const [displayedStudents, setDisplayedStudents] = useState<Siswa[]>([]);
    // const [sekolahs, setSekolahs] = useState<Sekolah[]>([]);
    const [hasUngraded, setHasUngraded] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Extract kecamatan and gugus from user data
    const kecamatanNama = korektor.gugus.kecamatan.nama;
    const gugusValue = korektor.gugus.gugus;

    // Initialize schools from user data
    // useEffect(() => {
    //     if (korektor && korektor.user_profile && korektor.user_profile.guguses) {
    //         setSekolahs(sekolah || []);
    //     }
    // }, [korektor]);

    // Fetch students data for the selected school and mapel
    const fetchStudentsData = async () => {
        if (!selectedSekolah || !selectedMapel) return;

        const sekolahId = Number.parseInt(selectedSekolah);
        const mapelId = Number.parseInt(selectedMapel);

        setIsLoading(true);

        try {
            // Make an API request to get the latest student data
            const response = await axios.get(`/siswas/refresh`, {
                params: {
                    sekolah_id: sekolahId,
                    mapel_id: mapelId,
                },
            });

            // Process the student data
            const students = response.data.map((siswa: Siswa) => {
                // Find existing nilai for this mapel if it exists
                const existingNilai = siswa.nilais.find((n) => n.mapel_id === mapelId);

                return {
                    ...siswa,
                    tempNilai: existingNilai ? existingNilai.nilai : '',
                    hasExistingNilai: !!existingNilai, // Flag to track if nilai already exists
                };
            });

            setDisplayedStudents(students);

            // Check if there are any students without grades
            const ungradedStudents = students.filter((student: Siswa) => !student.hasExistingNilai);
            setHasUngraded(ungradedStudents.length > 0);
        } catch (error) {
            console.error('Error fetching student data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle OK button click
    const handleOkClick = () => {
        fetchStudentsData();
    };

    // Handle nilai change
    const handleNilaiChange = (id: number, value: string) => {
        setDisplayedStudents((students) => students.map((student) => (student.id === id ? { ...student, tempNilai: value } : student)));
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Only include students without existing nilai in submission
        const submissionData = displayedStudents
            .filter((student) => !student.hasExistingNilai && student.tempNilai !== '')
            .map((student) => ({
                siswa_id: student.id,
                mapel_id: Number.parseInt(selectedMapel),
                nilai: Number(student.tempNilai),
            }));

        console.log('Data to submit:', submissionData);

        router.post(
            '/nilais',
            {
                _method: 'POST',
                submissionData: submissionData,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    console.log('Nilai created successfully');
                    // Fetch fresh data using Axios
                    fetchStudentsData();
                    setIsSubmitting(false);
                },
                onError: (errors) => {
                    console.error('Error create nilai:', errors);
                    setIsSubmitting(false);
                },
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Input Nilai" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl md:min-h-min">
                    {/* Info Table */}
                    <div className="mb-6 overflow-hidden rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="border-r font-bold">Kecamatan</TableHead>
                                    <TableHead className="font-bold">Gugus</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="border-r">{kecamatanNama}</TableCell>
                                    <TableCell>{gugusValue}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

                    {/* Selection Controls */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6 grid grid-cols-3 grid-rows-2 gap-x-4">
                            <div>
                                <Label htmlFor="mapel-select">Mata Pelajaran</Label>
                            </div>
                            <div>
                                <Label htmlFor="sekolah-select">Sekolah</Label>
                            </div>
                            <div className="row-start-2">
                                <Select value={selectedMapel} onValueChange={setSelectedMapel}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Mapel" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {mapels.map((mapel) => (
                                            <SelectItem key={mapel.id} value={mapel.id.toString()}>
                                                {mapel.nama}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="row-start-2">
                                <Select value={selectedSekolah} onValueChange={setSelectedSekolah}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Sekolah" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {sekolah.map((sekolah) => (
                                            <SelectItem key={sekolah.id} value={sekolah.id.toString()}>
                                                {sekolah.nama}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="row-start-2">
                                <Button type="button" onClick={handleOkClick} disabled={!selectedSekolah || !selectedMapel || isLoading}>
                                    {isLoading ? 'Loading...' : 'OK'}
                                </Button>
                            </div>
                        </div>

                        {/* Student Data Table - Only show if students are loaded */}
                        {displayedStudents.length > 0 && (
                            <div className="overflow-hidden rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[60px] text-center font-bold">No.</TableHead>
                                            <TableHead className="font-bold">Nama</TableHead>
                                            <TableHead className="font-bold">NISN</TableHead>
                                            <TableHead className="font-bold">Nilai</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {displayedStudents.map((student, index) => (
                                            <TableRow key={student.id}>
                                                <TableCell className="text-center">{index + 1}</TableCell>
                                                <TableCell>{student.nama}</TableCell>
                                                <TableCell>{student.nisn}</TableCell>
                                                <TableCell>
                                                    <Input
                                                        required={!student.hasExistingNilai}
                                                        value={student.tempNilai || ''}
                                                        onChange={(e) => handleNilaiChange(student.id, e.target.value)}
                                                        className={`w-full ${student.hasExistingNilai ? 'bg-gray-100' : ''}`}
                                                        type="number"
                                                        min="0"
                                                        max="100"
                                                        step="0.01"
                                                        readOnly={student.hasExistingNilai}
                                                        title={student.hasExistingNilai ? 'Nilai sudah ada' : ''}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {isLoading && (
                                            <TableRow>
                                                <TableCell colSpan={4} className="py-4 text-center">
                                                    Loading...
                                                </TableCell>
                                            </TableRow>
                                        )}
                                        {!isLoading && displayedStudents.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={4} className="py-4 text-center">
                                                    Siswa tidak ditemukan.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        )}

                        {/* Submit Button - Only show if students are loaded AND there are ungraded students */}
                        {displayedStudents.length > 0 && hasUngraded && (
                            <div className="mt-4 flex justify-end">
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button>Submit</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500">
                                                    <AlertCircle className="h-8 w-8 text-white" />
                                                </div>
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Dengan ini saya selaku operator <span className="text-blue-500">{auth.user.name}</span> <br />
                                                menyatakan bahwa nilai siswa yang saya masukkan untuk <br />
                                                <div className="grid grid-cols-[100px_1fr]">
                                                    <span>Sekolah</span>
                                                    <span>
                                                        : {sekolah.find((sekolah) => sekolah.id.toString() === selectedSekolah)?.nama || 'N/A'}
                                                    </span>
                                                    <span>Mata Pelajaran</span>
                                                    <span>
                                                        :{' '}
                                                        <span className="text-blue-500">
                                                            {mapels.find((mapel) => mapel.id.toString() === selectedMapel)?.nama || 'N/A'}
                                                        </span>
                                                    </span>
                                                </div>
                                                adalah benar dan dapat dipertanggungjawabkan. <br />
                                                <br />
                                                <br />
                                                *Setelah klik submit anda tidak diperkenankan untuk mengubah data nilai siswa. Tutup jendela untuk
                                                memeriksa kembali data nilai.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction asChild>
                                                <Button
                                                    type="submit"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleSubmit(e);
                                                    }}
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                                </Button>
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>

                                {/* <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                </Button> */}
                            </div>
                        )}

                        {/* Message when all students are already graded */}
                        {displayedStudents.length > 0 && !hasUngraded && (
                            <div className="mt-4 text-center text-gray-500">Semua siswa sudah diberikan nilai untuk mata pelajaran ini.</div>
                        )}
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
