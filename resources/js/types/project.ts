export interface ProjectProps {
    id: number
    name: string
    description?: string
}

export type ProjectType = Omit<ProjectProps, 'id'>
