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

export interface Gugus {
    id: number;
    gugus: number;
    kecamatan_id: number;
}

export interface UserProfile {
    id: number;
    user_id: number;
    guguses_id: number;
    kecamatan_id: number;
    kecamatan: Kecamatan;
    guguses: Gugus;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
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
    [key: string]: unknown; // This allows for additional properties...
}
