import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectProps } from '@/types/project';
import { DocumentProps } from '@/types/document';
import { Badge } from '@/components/ui/badge';
import {
  FolderIcon,
  FileTextIcon,
  CheckCircle2Icon,
  ClockIcon,
  Building2Icon,
  UsersIcon
} from 'lucide-react';

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

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex flex-col gap-6 p-4">
        {/* ... stats cards ... */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <FolderIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProjects}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
              <FileTextIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDocuments}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Returned</CardTitle>
              <CheckCircle2Icon className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.returnedDocuments}</div>
            </CardContent>
          </Card>

          <Card>
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
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Offices</CardTitle>
                  <Building2Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalOffices}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Accounts</CardTitle>
                  <UsersIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalAccounts}</div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProjects.length > 0 ? (
                  recentProjects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{project.name}</p>

                      </div>
                      {/* <Badge variant="secondary" className="text-[10px]">{project. || 'Active'}</Badge> */}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No recent projects found.</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDocuments.length > 0 ? (
                  recentDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{doc.payee}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {doc.project.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold">₱{Number(doc.ammount).toLocaleString()}</p>
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
