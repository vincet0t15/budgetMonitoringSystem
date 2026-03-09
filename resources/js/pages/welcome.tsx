import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Budget Monitoring System">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-background text-foreground lg:justify-center dark:bg-[#0a0a0a]">
                <header className="absolute top-0 w-full p-6 text-sm">
                    <nav className="flex items-center justify-between gap-4 max-w-7xl mx-auto w-full">
                        <div className="flex items-center gap-2 font-semibold">
                            <AppLogoIcon className="size-8 fill-current" />
                            <span className="text-lg tracking-tight">Budget Monitoring System</span>
                        </div>
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="text-sm font-medium hover:text-primary transition-colors"
                                    >
                                        Log in
                                    </Link>
                                    {canRegister && (
                                        <Link
                                            href={register()}
                                            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                        >
                                            Get Started
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                <main className="flex w-full max-w-7xl flex-col items-center px-6 text-center lg:px-8">
                    <div className="flex flex-col items-center gap-8 py-20 lg:py-32">
                        <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent">
                            <span className="mr-1 inline-flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                            Now Live: Centralized Budget Tracking
                        </div>

                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
                            Monitor Your Budget <br />
                            <span className="text-primary">With Precision</span>
                        </h1>

                        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                            A powerful, centralized platform designed for efficient budget monitoring,
                            document management, and real-time financial tracking for your projects.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            {auth.user ? (
                                <Link href={dashboard()}>
                                    <Button size="lg" className="h-12 px-8 text-base">
                                        Back to Dashboard
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href={register()}>
                                        <Button size="lg" className="h-12 px-8 text-base">
                                            Start Tracking Now
                                        </Button>
                                    </Link>
                                    <Link href={login()}>
                                        <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                                            Sign In
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>

                        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:mt-24">
                            <div className="flex flex-col items-center gap-2 rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                                <div className="rounded-full bg-primary/10 p-3 text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bar-chart-3"><path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></svg>
                                </div>
                                <h3 className="text-lg font-bold">Real-time Analytics</h3>
                                <p className="text-sm text-muted-foreground text-center">Get instant insights into your project spending and budget allocations.</p>
                            </div>
                            <div className="flex flex-col items-center gap-2 rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                                <div className="rounded-full bg-primary/10 p-3 text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-files"><path d="M20 7h-3a2 2 0 0 1-2-2V2" /><path d="M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h5l5 5v11a2 2 0 0 1-2 2z" /><path d="M5 22h10" /></svg>
                                </div>
                                <h3 className="text-lg font-bold">Document Management</h3>
                                <p className="text-sm text-muted-foreground text-center">Securely manage and paginate all project-related documents in one place.</p>
                            </div>
                            <div className="flex flex-col items-center gap-2 rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                                <div className="rounded-full bg-primary/10 p-3 text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></svg>
                                </div>
                                <h3 className="text-lg font-bold">Secure Access</h3>
                                <p className="text-sm text-muted-foreground text-center">Robust authentication and role-based access to keep your data protected.</p>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="w-full border-t py-6 md:py-0 bg-muted/30">
                    <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-6">
                        <p className="text-sm text-muted-foreground">
                            &copy; {new Date().getFullYear()} Budget Monitoring System. All rights reserved.
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <a href="#" className="hover:underline underline-offset-4">Privacy Policy</a>
                            <a href="#" className="hover:underline underline-offset-4">Terms of Service</a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
