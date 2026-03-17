import { Head, usePage } from '@inertiajs/react';
import {
  FolderIcon,
  FileTextIcon,
  CheckCircle2Icon,
  ClockIcon,
  Building2Icon,
  UsersIcon
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import type { DocumentProps } from '@/types/document';
import type { ProjectProps } from '@/types/project';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

interface DashboardProps {
  stats: {
    totalProjects: number;
    totalDocuments: number;
    returnedDocuments: number;
    pendingDocuments: number;
    totalOffices: number;
    totalAccounts: number;
  };
  recentProjects: ProjectProps[];
  recentDocuments: (DocumentProps & { project: ProjectProps })[];
}

export default function Dashboard({ stats, recentProjects, recentDocuments }: DashboardProps) {
  const { auth } = usePage().props as any;
  const isAdmin = auth.user.is_admin;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No date';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const returnedPct =
    stats.totalDocuments > 0
      ? Math.round((stats.returnedDocuments / stats.totalDocuments) * 100)
      : 0;
  const pendingPct = 100 - returnedPct;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex flex-col gap-6 p-4">
        <div className="rounded-xl bg-gradient-to-br from-primary/5 to-accent/10 p-4 ring-1 ring-primary/10">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Documents Status</div>
            <div className="text-xs text-muted-foreground">{returnedPct}% returned</div>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-primary transition-all"
              style={{ width: `${returnedPct}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>Returned: {stats.returnedDocuments}</span>
            <span>Pending: {stats.pendingDocuments}</span>
            <span>Total: {stats.totalDocuments}</span>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <FolderIcon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.totalProjects}</div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
              <FileTextIcon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.totalDocuments}</div>
            </CardContent>
          </Card>

          <Card className="border-green-500/20 bg-gradient-to-b from-green-500/10 to-transparent">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Returned</CardTitle>
              <CheckCircle2Icon className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.returnedDocuments}</div>
            </CardContent>
          </Card>

          <Card className="border-orange-500/20 bg-gradient-to-b from-orange-500/10 to-transparent">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <ClockIcon className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.pendingDocuments}</div>
            </CardContent>
          </Card>

          {isAdmin && (
            <>
              <Card className="border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Offices</CardTitle>
                  <Building2Icon className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{stats.totalOffices}</div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Accounts</CardTitle>
                  <UsersIcon className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{stats.totalAccounts}</div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
          <Card className="col-span-1 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/10">
            <CardHeader>
              <CardTitle className="text-primary">Recent Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProjects.length > 0 ? (
                  recentProjects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between border-b pb-2 last:border-0 border-primary/10">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none text-primary">{project.name}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No recent projects found.</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/10">
            <CardHeader>
              <CardTitle className="text-primary">Recent Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDocuments.length > 0 ? (
                  recentDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between border-b pb-2 last:border-0 border-primary/10">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{doc.payee}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {doc.project.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-primary">₱{Number(doc.ammount).toLocaleString()}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {formatDate(doc.date_created)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No recent documents found.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
