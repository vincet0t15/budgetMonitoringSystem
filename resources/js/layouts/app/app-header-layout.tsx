import { AppContent } from '@/components/app-content';
import { Navbar1 } from '@/components/app-header';
// import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import type { AppLayoutProps } from '@/types';

export default function AppHeaderLayout({
    children,
    breadcrumbs,
}: AppLayoutProps) {
    return (
        <AppShell>
            {/* <AppHeader breadcrumbs={breadcrumbs} /> */}
            <Navbar1 />
            <AppContent className='container mx-auto'>{children}</AppContent>
        </AppShell>
    );
}
