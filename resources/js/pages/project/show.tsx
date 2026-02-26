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
import { type BreadcrumbItem } from '@/types';
import { DocumentProps } from '@/types/document';
import { PaginatedDataResponse } from '@/types/pagination';
import Pagination from '@/components/paginationData';
import { Head } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import { ProjectProps } from '@/types/proejct';
import React from 'react';
import CreateDocument from '../documents/create';
import { Label } from '@/components/ui/label';

interface Props {
    project: ProjectProps;
    documents: PaginatedDataResponse<DocumentProps>;
}
export default function Dashboard({ project, documents }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: project.name,
            href: '/projects',
        },
    ];

    const [openCreateDocument, setOpenCreateDocument] = React.useState(false);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <Button
                        className="cursor-pointer rounded-sm"
                        onClick={() => setOpenCreateDocument(true)}
                    >
                        <PlusIcon />
                        <span className="rounded-sm lg:inline">
                            Register Document
                        </span>
                    </Button>

                    <div className="flex items-center gap-2">
                        <Input placeholder="Search..." className="" />
                    </div>
                </div>

                <div className="w-full overflow-hidden rounded-sm border shadow-sm">
                    <Table>
                        <TableHeader className="sticky top-0 z-10 bg-muted">
                            <TableRow className="dark:bg-gray-800">
                                <TableHead className="w-5">#</TableHead>
                                <TableHead className="">Serial No.</TableHead>
                                <TableHead className="">Payee</TableHead>
                                <TableHead className="">Particulars</TableHead>
                                <TableHead className="">F.P.P</TableHead>
                                <TableHead className="">Account Code</TableHead>
                                <TableHead className="">Ammount</TableHead>
                                <TableHead className="text-center">
                                    Return
                                </TableHead>
                                <TableHead className="text-center">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {documents.data.length > 0 ? (
                                documents.data.map((data, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            <Label>{data.serial_no}</Label>
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            <Label>{data.payee}</Label>
                                        </TableCell>
                                        <TableCell className="max-w-[200px] overflow-hidden font-medium">
                                            <Label className="block truncate overflow-hidden whitespace-nowrap">
                                                {data.particulars}
                                            </Label>
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            <Label>{data.fpp}</Label>
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            <Label>{data.account_code}</Label>
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            <Label>{data.ammount}</Label>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={9}
                                        className="text-center"
                                    >
                                        No data available
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div>
                    <Pagination data={documents} />
                </div>

                {openCreateDocument && (
                    <CreateDocument
                        open={openCreateDocument}
                        setOpen={setOpenCreateDocument}
                        projectId={project.id}
                    />
                )}
            </div>
        </AppLayout>
    );
}
