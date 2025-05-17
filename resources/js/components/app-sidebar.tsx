import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import AppLogo from './app-logo';

const { data: penyelesaian }: { data: any } = await axios.get(route('penyelesaian'));

const tingkatPenyelesaian = penyelesaian[0].tingkat_penyelesaian ?? 0;

const footerNavItems: NavItem[] = [
    // footer
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const userRole = auth.user?.roles[0] || ''; // Get the first role (assuming single role per user)

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        ...(String(userRole) === 'Operator Kecamatan'
            ? [
                  {
                      title: 'Input Nilai',
                      href: route('nilais'),
                  },
              ]
            : []),
        ...(tingkatPenyelesaian == 100 || String(userRole) === 'Admin'
            ? [
                  {
                      title: 'Perankingan',
                      href: '#',
                      items: [
                          {
                              title: 'Ranking Siswa',
                              href: route('ranking.siswas.index'),
                          },
                          {
                              title: 'Ranking Sekolah',
                              href: route('ranking.sekolahs.index'),
                          },
                      ],
                  },
              ]
            : []),

        ...(String(userRole) === 'Admin'
            ? [
                  {
                      title: 'Administrator',
                      href: '#',
                      items: [
                          {
                              title: 'Sekolah',
                              href: route('sekolahs.index'),
                          },
                          {
                              title: 'Siswa',
                              href: route('siswas.index'),
                          },
                          {
                              title: 'Mata Pelajaran',
                              href: route('mapels.index'),
                          },
                          {
                              title: 'User',
                              href: route('users.index'),
                          },
                          {
                              title: 'Log Activity',
                              href: route('aktifitas.index'),
                          },
                      ],
                  },
              ]
            : []),
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={route('dashboard')} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
