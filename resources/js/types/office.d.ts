import type { User } from './auth';

export interface OfficeProps {
    id: number;
    name: string;
    code: string;
}

export type OfficeType = Omit<OfficeProps, 'id'>;
