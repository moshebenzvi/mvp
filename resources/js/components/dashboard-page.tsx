'use client';

import type { DashboardRangkingController } from '@/types';
import { Check, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, PieChart, School, Search, Users, X } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import axios from 'axios';

// Fetch the school data and extract the `data` property
const { data: dashboardData }: { data: DashboardRangkingController[] } = await axios.get(route('dashboard.data'));

export default function DashboardPage() {
    // const [activeTab, setActiveTab] = useState('overview');
    const [searchTerm, setSearchTerm] = useState('');
    const [kecamatanFilter, setKecamatanFilter] = useState<string>('all');
    const [gugusFilter, setGugusFilter] = useState<string>('all');

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Extract unique kecamatan and gugus values for filters
    const kecamatans = useMemo(() => {
        const uniqueKecamatans = Array.from(new Set(dashboardData.map((data) => data.kecamatan)));
        return uniqueKecamatans.sort();
    }, []);

    const gugus = useMemo(() => {
        const uniqueGugus = Array.from(new Set(dashboardData.map((data) => data.gugus)));
        return uniqueGugus.sort((a, b) => a - b);
    }, []);

    // Filter schools based on search term and filters
    const filteredSchools = useMemo(() => {
        return dashboardData.filter((data) => {
            const matchesSearch = data.sekolah.toLowerCase().includes(searchTerm.toLowerCase()) || data.npsn.includes(searchTerm);
            const matchesKecamatan = kecamatanFilter === 'all' || data.kecamatan === kecamatanFilter;
            const matchesGugus = gugusFilter === 'all' || data.gugus.toString() === gugusFilter;

            return matchesSearch && matchesKecamatan && matchesGugus;
        });
    }, [searchTerm, kecamatanFilter, gugusFilter]);

    // Calculate paginated schools
    const paginatedSchools = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return filteredSchools.slice(startIndex, endIndex);
    }, [filteredSchools, currentPage, pageSize]);

    // Calculate total pages
    const totalPages = useMemo(() => {
        return Math.ceil(filteredSchools.length / pageSize);
    }, [filteredSchools, pageSize]);

    // Calculate summary statistics
    const summaryStats = useMemo(() => {
        const totalSchools = dashboardData.length;
        const totalStudents = dashboardData.reduce((sum, data) => sum + data.jumlah_siswa, 0);
        const totalKecamatans = new Set(dashboardData.map((data) => data.kecamatan)).size;
        const avgScore = dashboardData.reduce((sum, data) => sum + Number.parseFloat(data.avg_nilai), 0) / totalSchools;
        const totalSudahNilai = dashboardData.reduce((sum, data) => sum + Number(data.sudah_nilai), 0);
        const totalWajibNilai = dashboardData.reduce((sum, data) => sum + Number(data.wajib_nilai), 0);
        const completionRate = (totalSudahNilai / totalWajibNilai) * 100;
        // const completionRate = (dashboardData.reduce((sum, data) => sum + Number.parseInt(data.sudah_nilai) / data.wajib_nilai, 0) / totalSchools) * 100;

        return {
            totalSchools,
            totalStudents,
            totalKecamatans,
            avgScore: isNaN(avgScore) ? 0 : avgScore.toFixed(2),
            completionRate: isNaN(completionRate) ? 0 : completionRate.toFixed(2),
        };
    }, []);

    // Calculate subject completion rates
    // const subjectCompletionRates = useMemo(() => {
    //     const subjects = [
    //         { id: 'pabp', name: 'PABP' },
    //         { id: 'pendidikan_pancasila', name: 'PENDIDIKAN PANCASILA' },
    //         { id: 'ipas', name: 'IPAS' },
    //         { id: 'bahasa_jawa', name: 'BAHASA JAWA' },
    //         { id: 'bahasa_indonesia', name: 'BAHASA INDONESIA' },
    //         { id: 'seni_budaya', name: 'SENI BUDAYA' },
    //         { id: 'bahasa_inggris', name: 'BAHASA INGGRIS' },
    //         { id: 'pjok', name: 'PJOK' },
    //         { id: 'matematika', name: 'MATEMATIKA' },
    //     ];

    //     return subjects
    //         .map((subject) => {
    //             const completedCount = schoolData.reduce(
    //                 (sum, school) => sum + (Number(school[subject.id as keyof DashboardRangkingController]) || 0),
    //                 0,
    //             );
    //             const completionRate = (completedCount / schoolData.length) * 100;

    //             return {
    //                 ...subject,
    //                 completionRate: completionRate.toFixed(2),
    //                 completedCount,
    //             };
    //         })
    //         .sort((a, b) => Number.parseFloat(b.completionRate) - Number.parseFloat(a.completionRate));
    // }, []);

    // Calculate district performance
    // const districtPerformance = useMemo(() => {
    //     const districtMap = new Map<string, { schools: number; avgScore: number; completionRate: number }>();

    //     schoolData.forEach((school) => {
    //         const district = school.kecamatan_nama;
    //         const currentData = districtMap.get(district) || { schools: 0, avgScore: 0, completionRate: 0 };

    //         const newSchoolCount = currentData.schools + 1;
    //         const newAvgScore = (currentData.avgScore * currentData.schools + Number.parseFloat(school.avg_nilai)) / newSchoolCount;
    //         const newCompletionRate =
    //             (currentData.completionRate * currentData.schools + (Number.parseInt(school.sudah_nilai) / school.wajib_nilai) * 100) /
    //             newSchoolCount;

    //         districtMap.set(district, {
    //             schools: newSchoolCount,
    //             avgScore: newAvgScore,
    //             completionRate: newCompletionRate,
    //         });
    //     });

    //     return Array.from(districtMap.entries())
    //         .map(([district, data]) => ({
    //             district,
    //             schools: data.schools,
    //             avgScore: data.avgScore.toFixed(2),
    //             completionRate: data.completionRate.toFixed(2),
    //         }))
    //         .sort((a, b) => Number.parseFloat(b.avgScore) - Number.parseFloat(a.avgScore));
    // }, []);

    // Pagination component
    const Pagination = () => {
        return (
            <div className="flex items-center justify-between px-2 py-4">
                <div className="text-muted-foreground flex-1 text-xs">
                    Menampilkan {paginatedSchools.length} dari {filteredSchools.length} sekolah
                </div>
                <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="flex items-center space-x-2">
                        <p className="text-xs font-medium">Baris per halaman</p>
                        <Select
                            value={pageSize.toString()}
                            onValueChange={(value) => {
                                setPageSize(Number(value));
                                setCurrentPage(1); // Reset to first page when changing page size
                            }}
                        >
                            <SelectTrigger className="h-8 w-[70px]">
                                <SelectValue placeholder={pageSize} />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {[5, 10, 20, 50, 100].map((size) => (
                                    <SelectItem key={size} value={size.toString()}>
                                        {size}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex w-[100px] items-center justify-center text-xs font-medium">
                        Halaman {currentPage} dari {totalPages || 1}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                        >
                            <span className="sr-only">Ke halaman pertama</span>
                            <ChevronsLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            <span className="sr-only">Ke halaman sebelumnya</span>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages || totalPages === 0}
                        >
                            <span className="sr-only">Ke halaman berikutnya</span>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages || totalPages === 0}
                        >
                            <span className="sr-only">Ke halaman terakhir</span>
                            <ChevronsRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                        <p className="text-muted-foreground">Analisis dan metrik kinerja sekolah</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative w-64">
                            <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
                            <Input
                                placeholder="Cari sekolah..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Sekolah</CardTitle>
                                <School className="text-muted-foreground h-4 w-4" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{summaryStats.totalSchools}</div>
                                <p className="text-muted-foreground text-xs">Dari {summaryStats.totalKecamatans} Kecamatan</p>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Siswa</CardTitle>
                                <Users className="text-muted-foreground h-4 w-4" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{summaryStats.totalStudents}</div>
                                <p className="text-muted-foreground text-xs">
                                    Rata-rata {(summaryStats.totalStudents / summaryStats.totalSchools).toFixed(1)} per sekolah
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Tingkat Penyelesaian</CardTitle>
                                <PieChart className="text-muted-foreground h-4 w-4" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{summaryStats.completionRate}%</div>
                                <Progress value={Number.parseFloat(summaryStats.completionRate.toString())} className="mt-2" />
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <Card>
                        <div className="grid grid-cols-1 gap-0 px-0 py-0 xl:grid-cols-2">
                            <div className="">
                                <CardHeader>
                                    <CardTitle>Status Mata Pelajaran menurut Sekolah</CardTitle>
                                    <CardDescription>Tampilan terperinci penyelesaian mata pelajaran untuk setiap sekolah</CardDescription>
                                </CardHeader>
                            </div>
                            <div className="">
                                <div className="grid grid-cols-1 gap-2 px-6 py-0 xl:grid-cols-2">
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium">Kecamatan</label>
                                        <Select value={kecamatanFilter} onValueChange={setKecamatanFilter}>
                                            <SelectTrigger className="h-8">
                                                <SelectValue placeholder="Semua Kecamatan" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">Semua Kecamatan</SelectItem>
                                                {kecamatans.map((kecamatan) => (
                                                    <SelectItem key={kecamatan} value={kecamatan}>
                                                        {kecamatan}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-medium">Gugus</label>
                                        <Select value={gugusFilter} onValueChange={setGugusFilter}>
                                            <SelectTrigger className="h-8">
                                                <SelectValue placeholder="Semua Gugus" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">Semua Gugus</SelectItem>
                                                {gugus.map((g) => (
                                                    <SelectItem key={g} value={g.toString()}>
                                                        Gugus {g}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nama Sekolah</TableHead>
                                            <TableHead>NPSN</TableHead>
                                            <TableHead>Kecamatan</TableHead>
                                            <TableHead>PABP</TableHead>
                                            <TableHead>PANCASILA</TableHead>
                                            <TableHead>IPAS</TableHead>
                                            <TableHead>B. JAWA</TableHead>
                                            <TableHead>B. INDO</TableHead>
                                            <TableHead>SENI</TableHead>
                                            <TableHead>B. INGGRIS</TableHead>
                                            <TableHead>PJOK</TableHead>
                                            <TableHead>MTK</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {paginatedSchools.map((school) => (
                                            <TableRow key={school.sekolah_id}>
                                                <TableCell className="font-medium">{school.sekolah}</TableCell>
                                                <TableCell className="font-medium">{school.npsn}</TableCell>
                                                <TableCell className="font-medium">{school.kecamatan_nama}</TableCell>
                                                <TableCell>
                                                    {school.pabp ? (
                                                        <Check className="h-4 w-4 text-green-500" />
                                                    ) : (
                                                        <X className="h-4 w-4 text-red-500" />
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {school.pendidikan_pancasila ? (
                                                        <Check className="h-4 w-4 text-green-500" />
                                                    ) : (
                                                        <X className="h-4 w-4 text-red-500" />
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {school.ipas ? (
                                                        <Check className="h-4 w-4 text-green-500" />
                                                    ) : (
                                                        <X className="h-4 w-4 text-red-500" />
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {school.bahasa_jawa ? (
                                                        <Check className="h-4 w-4 text-green-500" />
                                                    ) : (
                                                        <X className="h-4 w-4 text-red-500" />
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {school.bahasa_indonesia ? (
                                                        <Check className="h-4 w-4 text-green-500" />
                                                    ) : (
                                                        <X className="h-4 w-4 text-red-500" />
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {school.seni_budaya ? (
                                                        <Check className="h-4 w-4 text-green-500" />
                                                    ) : (
                                                        <X className="h-4 w-4 text-red-500" />
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {school.bahasa_inggris ? (
                                                        <Check className="h-4 w-4 text-green-500" />
                                                    ) : (
                                                        <X className="h-4 w-4 text-red-500" />
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {school.pjok ? (
                                                        <Check className="h-4 w-4 text-green-500" />
                                                    ) : (
                                                        <X className="h-4 w-4 text-red-500" />
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {school.matematika ? (
                                                        <Check className="h-4 w-4 text-green-500" />
                                                    ) : (
                                                        <X className="h-4 w-4 text-red-500" />
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <Pagination />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
