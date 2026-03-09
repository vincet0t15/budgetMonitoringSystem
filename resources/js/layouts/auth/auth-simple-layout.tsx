import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';

interface AuthSimpleLayoutProps {
    children: ReactNode;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: AuthSimpleLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 md:p-10 dark:bg-[#0a0a0a]">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <Link href="/" className="flex flex-col items-center gap-2 font-medium">
                            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm">
                                <AppLogoIcon className="size-6 fill-current" />
                            </div>
                            <span className="text-xl font-bold tracking-tight">Budget Monitoring System</span>
                        </Link>
                        {title && <h1 className="text-2xl font-semibold tracking-tight mt-4">{title}</h1>}
                        {description && <p className="text-balance text-center text-sm text-muted-foreground">{description}</p>}
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
