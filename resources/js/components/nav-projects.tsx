'use client';

import {
    Folder,
    Forward,
    MoreHorizontal,
    PlusIcon,
    Trash2,
    type LucideIcon,
    Frame,
    PenLineIcon,
} from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { useState } from 'react';
import { CreateProjectDialog } from '@/pages/project/create';
import { Link, usePage } from '@inertiajs/react';
import { ProjectProps } from '@/types/project';
import { EditProjectDialog } from '@/pages/project/edit';
import DeleteProject from '@/pages/project/delete';

type Project = {
    id: number;
    name: string;
};

type SharedProjects = {
    items: Project[];
    total: number;
};

export function NavProjects({ projects }: { projects: SharedProjects }) {
    const { isMobile } = useSidebar();
    const { url } = usePage();
    const [openCreateProject, setOpenCreateProject] = useState(false);
    const [openEditProject, setOpenEditProject] = useState(false);
    const [openDeleteProject, setOpenDeleteProject] = useState(false);
    const [selectedProject, setSelectedProject] = useState<ProjectProps | null>(
        null,
    );
    const items = projects?.items || [];
    const total = projects?.total || 0;

    const handleClickEdit = (project: ProjectProps) => {
        setSelectedProject(project);
        setOpenEditProject(true);
    };

    const handleClickDelete = (project: ProjectProps) => {
        setSelectedProject(project);
        setOpenDeleteProject(true);
    };
    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <div className="flex items-center justify-between px-2">
                <SidebarGroupLabel>Projects</SidebarGroupLabel>
                <PlusIcon
                    onClick={() => setOpenCreateProject(true)}
                    className="size-4 cursor-pointer text-sidebar-foreground/70 hover:text-sidebar-foreground"
                />
            </div>
            <SidebarMenu>
                {items.length > 0 ? (
                    items.map((item) => {
                        const projectUrl = `/projects/${item.id}`;
                        const isActive = url === projectUrl;
                        return (
                            <SidebarMenuItem key={item.id}>
                                <SidebarMenuButton asChild isActive={isActive}>
                                    <Link href={projectUrl}>
                                        <Frame />
                                        <span>{item.name}</span>
                                    </Link>
                                </SidebarMenuButton>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuAction showOnHover>
                                            <MoreHorizontal />
                                            <span className="sr-only">
                                                More
                                            </span>
                                        </SidebarMenuAction>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        className="w-48 rounded-lg"
                                        side={isMobile ? 'bottom' : 'right'}
                                        align={isMobile ? 'end' : 'start'}
                                    >
                                        <DropdownMenuItem>
                                            <Folder className="text-muted-foreground" />
                                            <span>View Project</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() =>
                                                handleClickEdit(item)
                                            }
                                        >
                                            <PenLineIcon className="text-muted-foreground" />
                                            <span>Edit</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={() =>
                                                handleClickDelete(item)
                                            }
                                        >
                                            <Trash2 className="text-muted-foreground" />
                                            <span>Delete Project</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </SidebarMenuItem>
                        );
                    })
                ) : (
                    <SidebarMenuItem>
                        <SidebarMenuButton disabled>
                            <span className="text-muted-foreground italic">
                                No projects found
                            </span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                )}
                {total > 5 && (
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="text-sidebar-foreground/70"
                            isActive={url === '/projects'}
                        >
                            <Link href="/projects">
                                <MoreHorizontal className="text-sidebar-foreground/70" />
                                <span>More</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                )}
            </SidebarMenu>
            {openCreateProject && (
                <CreateProjectDialog
                    open={openCreateProject}
                    isOpen={setOpenCreateProject}
                />
            )}

            {openEditProject && selectedProject && (
                <EditProjectDialog
                    open={openEditProject}
                    isOpen={setOpenEditProject}
                    project={selectedProject}
                />
            )}

            {openDeleteProject && selectedProject && (
                <DeleteProject
                    open={openDeleteProject}
                    setOpen={setOpenDeleteProject}
                    project={selectedProject}
                />
            )}
        </SidebarGroup>
    );
}
