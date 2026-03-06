import { Head, router } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import type { ChangeEventHandler, KeyboardEventHandler } from 'react';
import { useState } from 'react';
import Pagination from '@/components/paginationData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import offices from '@/routes/offices';
import type { BreadcrumbItem } from '@/types';
import type { FilterProps } from '@/types/filter';

import type { PaginatedDataResponse } from '@/types/pagination';
import { OfficeCreateDialog } from './create';
import DeleteOffice from './delete';
import { OfficeEditDialog } from './edit';
import { OfficeProps } from '@/types/office';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface Props {
    offices_list: PaginatedDataResponse<OfficeProps>;
    filters: FilterProps;
}

export default function OfficeIndex({ offices_list, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedOffice, setSelectedOffice] = useState<OfficeProps>();

    const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearch(e.target.value);
    };

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        const queryString = search ? search : '';
        if (e.key === 'Enter') {
            e.preventDefault();
            router.get(
                offices.index.url(),
                {
                    search: queryString,
                },
                {
                    preserveState: true,
                    replace: true,
                },
            );
        }
    };

    const onEditClick = (office: OfficeProps) => {
        setSelectedOffice(office);
        setOpenEdit(true);
    };

    const onDeleteClick = (office: OfficeProps) => {
        setSelectedOffice(office);
        setOpenDelete(true);
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Office" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <Button
                        onClick={() => setOpenCreate(true)}
                        className="cursor-pointer rounded-sm"
                    >
                        <PlusIcon />
                        <span className="rounded-sm lg:inline">Add Office</span>
                    </Button>

                    <div className="flex items-center gap-2">
                        <Input
                            placeholder="Search..."
                            className=""
                            value={search}
                            onChange={handleSearch}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>

                <div className="w-full overflow-hidden rounded-sm border shadow-sm">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead className="font-bold text-primary">
                                    Office Name
                                </TableHead>
                                <TableHead className="font-bold text-primary">
                                    Office Code
                                </TableHead>
                                <TableHead className="w-25 text-center font-bold text-primary">
                                    {' '}
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {offices_list.data.length > 0 ? (
                                offices_list.data.map((office, index) => (
                                    <TableRow key={index} className="text-sm">
                                        <TableCell>
                                            <span>{office.name}</span>
                                        </TableCell>
                                        <TableCell>
                                            <span>{office.code}</span>
                                        </TableCell>

                                        <TableCell className="flex justify-end gap-2 text-sm">
                                            <span
                                                className="cursor-pointer text-green-500 hover:text-green-700 hover:underline"
                                                onClick={() =>
                                                    onEditClick(office)
                                                }
                                            >
                                                Edit
                                            </span>
                                            <span
                                                className="cursor-pointer text-red-500 hover:text-orange-700 hover:underline"
                                                onClick={() =>
                                                    onDeleteClick(office)
                                                }
                                            >
                                                Delete
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="py-3 text-center text-gray-500"
                                    >
                                        No data available.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div>
                    <Pagination data={offices_list} />
                </div>
            </div>
            {openCreate && (
                <OfficeCreateDialog open={openCreate} setOpen={setOpenCreate} />
            )}

            {openEdit && selectedOffice && (
                <OfficeEditDialog
                    open={openEdit}
                    setOpen={setOpenEdit}
                    office={selectedOffice!}
                />
            )}

            {openDelete && selectedOffice && (
                <DeleteOffice
                    open={openDelete}
                    setOpen={setOpenDelete}
                    office={selectedOffice!}
                />
            )}
        </AppLayout>
    );
}
