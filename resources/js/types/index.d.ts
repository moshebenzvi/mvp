import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    items?: NavItem[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

/*
    Database Schema
*/

export interface Role {
    name: string;
}

export interface Kecamatan {
    id: number;
    nama: string;
}

export interface Guguses {
    id: number;
    gugus: number;
    kecamatan_id: number;
    sekolahs?: Sekolah[];
}

export interface Sekolah {
    id: number;
    nama: string;
    npsn: string;
    guguses_id: number;
    kecamatan_id: number;
    siswas: Siswa[];
}

export interface Siswa {
    id: number;
    nama: string;
    kelamin: string;
    nisn: string;
    sekolah_id: number;
    nilais: Nilai[];
    tempNilai?: string; // For form state
    hasExistingNilai?: boolean; // Flag to track if nilai already exists
}

export interface Nilai {
    id: number;
    siswa_id: number;
    mapel_id: number;
    nilai: string;
    mapel: Mapel;
}

export interface Mapel {
    id: number;
    nama: string;
    active: number;
}

export interface UserProfile {
    id: number;
    user_id: number;
    guguses_id: number;
    kecamatan_id: number;
    kecamatan: Kecamatan;
    guguses: Guguses;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    roles: string;
    created_at: string;
    updated_at: string;
    user_profile: UserProfile;
    [key: string]: unknown; // This allows for additional properties...
}
/*
    Controller
*/

export interface UserController {
    id: number;
    name: string;
    email: string;
    kecamatan: string;
    gugus: string;
    role: string;
    // [key: string]: unknown; // This allows for additional properties...
}

export interface SekolahController {
    id: number;
    nama: string;
    npsn: number;
    nama_kecamatan: string;
    gugus: number;
    siswas_count: number;
}

export interface SiswaController {
    id: number;
    nama: string;
    nisn: string;
    nama_sekolah: string;
    npsn_sekolah: string;
    nama_kecamatan: string;
}

export interface RangkingSiswaController {
    siswa_id: number;
    sekolah_id: number;
    PABP: number | null;
    PENDIDIKAN_PANCASILA: number | null;
    IPAS: number | null;
    BAHASA_JAWA: number | null;
    BAHASA_INDONESIA: number | null;
    SENI_BUDAYA: number | null;
    BAHASA_INGGRIS: number | null;
    PJOK: number | null;
    MATEMATIKA: number | null;
    count_nilai: number | null;
    avg_nilai: number | null;
    siswa_nama: string;
    nisn: string;
    sekolah_nama: string;
    npsn: string;
    kecamatan: string;
    gugus: number;
}

export interface RangkingSekolahController {
    sekolah_id: number;
    jumlah_siswa: number;
    PABP: boolean;
    PENDIDIKAN_PANCASILA: boolean;
    IPAS: boolean;
    BAHASA_JAWA: boolean;
    BAHASA_INDONESIA: boolean;
    SENI_BUDAYA: boolean;
    BAHASA_INGGRIS: boolean;
    PJOK: boolean;
    MATEMATIKA: boolean;
    wajib_nilai: number;
    sudah_nilai: number;
    avg_nilai: number;
    sekolah_nama: string;
    npsn: string;
    kecamatan_id: number;
    kecamatan_nama: string;
    gugus: number;
}

interface DashboardRangkingController {
    sekolah_id: number
    sekolah_nama: string
    npsn: string
    kecamatan_id: number
    kecamatan_nama: string
    gugus: number
    jumlah_siswa: number
    pabp: number
    pendidikan_pancasila: number
    ipas: number
    bahasa_jawa: number
    bahasa_indonesia: number
    seni_budaya: number
    bahasa_inggris: number
    pjok: number
    matematika: number
    wajib_nilai: number
    sudah_nilai: string
    avg_nilai: string
}