import { Head, Link } from '@inertiajs/react';
import { FolderIcon, PlusIcon } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import type { PaginatedDataResponse } from '@/types/pagination';
import type { ProjectProps } from '@/types/project';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Projects', href: '/projects' },
];

export default function ProjectsIndex({
  projectList,
}: {
  projectList: PaginatedDataResponse<ProjectProps>;
}) {
  const items = projectList?.data ?? [];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Projects" />
      <div className="flex flex-col gap-6 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Projects</h1>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-md border border-primary/20 bg-primary/5 px-3 py-2 text-sm text-primary hover:bg-primary/10"
          >
            <PlusIcon className="h-4 w-4" />
            New Project
          </Link>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {items.length > 0 ? (
            items.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="group rounded-lg border border-primary/20 bg-gradient-to-b from-primary/5 to-transparent p-4 transition-colors hover:bg-primary/10"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <FolderIcon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-primary">
                      {project.name}
                    </div>
                    {project.description && (
                      <div className="line-clamp-2 text-xs text-muted-foreground">
                        {project.description}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="rounded-lg border p-8 text-center text-sm text-muted-foreground">
              No projects found.
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
