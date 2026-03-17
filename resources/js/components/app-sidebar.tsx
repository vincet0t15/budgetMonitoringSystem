'use client';

import { usePage } from '@inertiajs/react';
import {
    AudioWaveform,
    BookOpen,
    Bot,
    Building2,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
    UserCheck2,
    Users2Icon,
} from 'lucide-react';
import * as React from 'react';

import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from '@/components/ui/sidebar';
import accounts from '@/routes/accounts';
import offices from '@/routes/offices';
import type { NavItem } from '@/types/navigation';
import { NavFooter } from './nav-footer';

const data = {
    user: {
        name: 'shadcn',
        email: 'm@example.com',
        avatar: '/avatars/shadcn.jpg',
    },
    teams: [
        {
            name: 'Acme Inc',
            logo: GalleryVerticalEnd,
            plan: 'Enterprise',
        },
        {
            name: 'Acme Corp.',
            logo: AudioWaveform,
            plan: 'Startup',
        },
        {
            name: 'Evil Corp.',
            logo: Command,
            plan: 'Free',
        },
    ],
    navMain: [
        {
            title: 'Playground',
            url: '#',
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: 'History',
                    url: '#',
                },
                {
                    title: 'Starred',
                    url: '#',
                },
                {
                    title: 'Settings',
                    url: '#',
                },
            ],
        },
        {
            title: 'Models',
            url: '#',
            icon: Bot,
            items: [
                {
                    title: 'Genesis',
                    url: '#',
                },
                {
                    title: 'Explorer',
                    url: '#',
                },
                {
                    title: 'Quantum',
                    url: '#',
                },
            ],
        },
        {
            title: 'Documentation',
            url: '#',
            icon: BookOpen,
            items: [
                {
                    title: 'Introduction',
                    url: '#',
                },
                {
                    title: 'Get Started',
                    url: '#',
                },
                {
                    title: 'Tutorials',
                    url: '#',
                },
                {
                    title: 'Changelog',
                    url: '#',
                },
            ],
        },
        {
            title: 'Settings',
            url: '#',
            icon: Settings2,
            items: [
                {
                    title: 'General',
                    url: '#',
                },
                {
                    title: 'Team',
                    url: '#',
                },
                {
                    title: 'Billing',
                    url: '#',
                },
                {
                    title: 'Limits',
                    url: '#',
                },
            ],
        },
    ],
};
const footerNavItems: NavItem[] = [
    {
        title: 'Office',
        href: offices.index.url(),
        icon: Building2,
    },
    {
        title: 'Accounts',
        href: accounts.index.url(),
        icon: Users2Icon,
    },
];
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { auth, sharedProjects } = usePage().props as any;

    return (
        <Sidebar collapsible="offcanvas" variant="inset">
            <div className="relative flex h-full w-full flex-col overflow-hidden rounded-sm">
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                >
                    <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-primary/12 to-transparent" />
                    <div className="absolute -top-28 -left-28 size-72 rounded-full bg-primary/12 blur-3xl" />
                    <div className="absolute -right-40 -bottom-40 size-96 rounded-full bg-primary/10 blur-3xl" />
                </div>

                <div className="relative z-10 flex h-full w-full flex-col">
                    <SidebarHeader>
                        <TeamSwitcher teams={data.teams} />
                    </SidebarHeader>
                    <SidebarContent>
                        <NavProjects projects={sharedProjects} />
                    </SidebarContent>
                    <SidebarFooter>
                        <NavFooter items={footerNavItems} className="mt-auto" />
                        <NavUser user={auth.user} />
                    </SidebarFooter>
                    <SidebarRail />
                </div>
            </div>
        </Sidebar >
    );
}
