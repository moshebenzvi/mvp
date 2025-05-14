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
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    roles: string[];
    [key: string]: unknown; // This allows for additional properties...
}

export interface Siswa {
    id: number;
    nama: string;
    nisn: string;
    kelamin: string;
    sekolah_id: number;
    sekolah: string;
    nilais: Nilai[];
    created_at: string;
    updated_at: string;
}

export interface Sekolah {
    id: number;
    nama: string;
    npsn: string;
    gugus_id: number;
    created_at: string;
    updated_at: string;
}

export interface RangkingSekolah {
    sekolah_id: number;
    jumlah_siswa: number;
    AVG_PABP: number;
    AVG_PENDIDIKAN_PANCASILA: number;
    AVG_IPAS: number;
    AVG_BAHASA_JAWA: number;
    AVG_BAHASA_INDONESIA: number;
    AVG_SENI_BUDAYA: number;
    AVG_BAHASA_INGGRIS: number;
    AVG_PJOK: number;
    AVG_MATEMATIKA: number;
    PABP: number;
    PENDIDIKAN_PANCASILA: number;
    IPAS: number;
    BAHASA_JAWA: number;
    BAHASA_INDONESIA: number;
    SENI_BUDAYA: number;
    BAHASA_INGGRIS: number;
    PJOK: number;
    MATEMATIKA: number;
    wajib_nilai: number;
    sudah_nilai: number;
    avg_nilai: number;
}
