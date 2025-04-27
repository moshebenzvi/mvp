import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import AppLogo from './app-logo';

const footerNavItems: NavItem[] = [
    // footer
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const userRole = auth.user?.roles[0] || ''; // Get the first role (assuming single role per user)

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        ...(String(userRole) === 'Korektor'
            ? [
                  {
                      title: 'Input Nilai',
                      href: '/nilai',
                  },
              ]
            : []),
        {
            title: 'Perankingan',
            href: '#',
            items: [
                {
                    title: 'Ranking Siswa',
                    href: '/rankings/siswa',
                },
                {
                    title: 'Ranking Sekolah',
                    href: '/rankings/sekolah',
                },
            ],
        },
        ...(String(userRole) === 'Admin'
            ? [
                  {
                      title: 'Administrator',
                      href: '#',
                      items: [
                          {
                              title: 'Sekolah',
                              href: '/sekolahs',
                          },
                          {
                              title: 'Siswa',
                              href: '/siswa',
                          },
                          {
                              title: 'Mata Pelajaran',
                              href: '/mapels',
                          },
                          {
                              title: 'User',
                              href: '/users',
                          },
                          {
                              title: 'Log Activity',
                              href: '/logs',
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
                            <Link href="/dashboard" prefetch>
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
