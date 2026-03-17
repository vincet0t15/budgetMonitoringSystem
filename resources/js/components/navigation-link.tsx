"use client"

import { Link, usePage } from "@inertiajs/react"
import * as React from "react"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import type { ProjectProps } from "@/types/project"

type SharedProjects = {
    items: ProjectProps[]
    total: number
}


export function NavigationMenuDemo() {
    const { sharedProjects } = usePage().props as unknown as {
        sharedProjects: SharedProjects
    }
    const items = sharedProjects?.items ?? []
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem className="hidden md:flex">
                    <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {items.map((project) => (
                                <ListItem
                                    key={project.id}
                                    title={project.name}
                                    href={`/projects/${project.id}`}
                                >
                                    View project
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

            </NavigationMenuList>
        </NavigationMenu>
    )
}

function ListItem({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { title: string; href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link href={href} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div className="flex flex-col gap-1 text-sm">
                        <div className="leading-none font-medium">{title}</div>
                        <div className="line-clamp-2 text-muted-foreground">{children}</div>
                    </div>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}
