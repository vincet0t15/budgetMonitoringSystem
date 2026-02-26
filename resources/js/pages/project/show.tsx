import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { Head, router, useForm } from '@inertiajs/react';
import { PlusIcon, CheckCircle2, Circle, RotateCcw } from 'lucide-react';
import { ProjectProps } from '@/types/proejct';
import React, {
    ChangeEventHandler,
    KeyboardEventHandler,
    useState,
} from 'react';
import CreateDocument from '../documents/create';
import EditDocument from '../documents/edit';
import ViewDocument from '../documents/view';
import { Label } from '@/components/ui/label';
import { FilterProps } from '@/types/filter';
import projects from '@/routes/projects';

interface Props {
    project: ProjectProps;
    documents: PaginatedDataResponse<DocumentProps>;
    filters: FilterProps;
}
export default function Dashboard({ project, documents, filters }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: project.name,
            href: '/projects',
        },
    ];

    const { data, setData } = useForm({
        search: filters.search,
    });

    const tabs = [
        { label: 'All', value: 'all' },
        { label: 'Not Return', value: 'not_return' },
        { label: 'Return', value: 'return' },
    ];
    const [tab, setTab] = useState<string>(filters.statusId ?? 'all');

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') {
            const params: Record<string, string> = {};

            if (data.search) params.search = data.search;
            if (tab && tab !== 'all') params.statusId = tab;

            router.get(projects.show(project.id), params, {
                preserveState: true,
                preserveScroll: true,
            });
        }
    };

    const handleTabChange = (value: string) => {
        const params: Record<string, string> = {};

        if (value !== 'all') {
            params.statusId = value;
        }

        router.get(projects.show(project.id), params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const [openCreateDocument, setOpenCreateDocument] = React.useState(false);
    const [openEditDocument, setOpenEditDocument] = React.useState(false);
    const [openViewDocument, setOpenViewDocument] = React.useState(false);
    const [editingDocument, setEditingDocument] =
        useState<DocumentProps | null>(null);
    const [viewingDocument, setViewingDocument] =
        useState<DocumentProps | null>(null);

    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const toggleSelect = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
        );
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === documents.data.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(documents.data.map((d) => d.id));
        }
    };

    const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setData('search', e.target.value);
    };

    const handleEdit = (doc: DocumentProps) => {
        setEditingDocument(doc);
        setOpenEditDocument(true);
    };

    const handleView = (doc: DocumentProps) => {
        setViewingDocument(doc);
        setOpenViewDocument(true);
    };

    const handleBulkReturn = () => {
        if (selectedIds.length === 0) return;
        router.post(
            '/documents/bulk-return',
            { ids: selectedIds },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
        setSelectedIds([]);
    };

    const handleBulkPending = () => {
        if (selectedIds.length === 0) return;
        router.post(
            '/documents/bulk-pending',
            { ids: selectedIds },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
        setSelectedIds([]);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex gap-2">
                        <Button
                            className="cursor-pointer rounded-sm"
                            onClick={() => setOpenCreateDocument(true)}
                        >
                            <PlusIcon />
                            <span className="rounded-sm lg:inline">
                                Register Document
                            </span>
                        </Button>
                        {selectedIds.length > 0 && (
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-teal-600 hover:text-teal-700"
                                    onClick={handleBulkReturn}
                                >
                                    Mark selected as returned
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={handleBulkPending}
                                    className="text-orange-600 hover:text-orange-700"
                                >
                                    Mark selected as not returned
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <Tabs
                                value={tab}
                                onValueChange={(value) => {
                                    setTab(value);
                                    handleTabChange(value);
                                }}
                            >
                                <TabsList>
                                    {tabs.map((t, index) => (
                                        <TabsTrigger
                                            key={index}
                                            value={t.value}
                                        >
                                            {t.label}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </Tabs>

                            <Input
                                onKeyDown={handleKeyDown}
                                onChange={handleSearchChange}
                                placeholder="Search..."
                                name="search"
                                value={data.search}
                            />
                        </div>
                    </div>
                </div>

                <div className="w-full overflow-hidden rounded-sm border shadow-sm">
                    <Table>
                        <TableHeader className="sticky top-0 z-10 bg-muted">
                            <TableRow className="dark:bg-gray-800">
                                <TableHead className="w-5">
                                    <Checkbox
                                        checked={
                                            selectedIds.length ===
                                                documents.data.length &&
                                            documents.data.length > 0
                                        }
                                        onCheckedChange={toggleSelectAll}
                                    />
                                </TableHead>
                                <TableHead className="w-5">#</TableHead>
                                <TableHead className="">Serial No.</TableHead>
                                <TableHead className="">Payee</TableHead>
                                <TableHead className="">Particulars</TableHead>
                                <TableHead className="">F.P.P</TableHead>
                                <TableHead className="">Account Code</TableHead>
                                <TableHead className="">Ammount</TableHead>
                                <TableHead className="">Remarks</TableHead>
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
                                        <TableCell className="w-5">
                                            <Checkbox
                                                checked={selectedIds.includes(
                                                    data.id,
                                                )}
                                                onCheckedChange={() =>
                                                    toggleSelect(data.id)
                                                }
                                            />
                                        </TableCell>
                                        <TableCell className="w-5 font-medium">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            <Label
                                                className="cursor-pointer text-blue-600 hover:underline"
                                                onClick={() => handleView(data)}
                                            >
                                                {data.serial_no}
                                            </Label>
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            <Label>{data.payee}</Label>
                                        </TableCell>
                                        <TableCell className="max-w-xs overflow-hidden font-medium">
                                            <Label className="block truncate">
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
                                        <TableCell className="max-w-xs overflow-hidden font-medium">
                                            <Label className="block truncate">
                                                {data.remarks || '-'}
                                            </Label>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                {data.is_returned ? (
                                                    <div className="flex items-center gap-1">
                                                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                                                        <span className="text-xs text-gray-500">
                                                            {data.returned_at
                                                                ? new Date(
                                                                      data.returned_at,
                                                                  ).toLocaleDateString()
                                                                : ''}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <Circle className="h-5 w-5 text-gray-400" />
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <Label
                                                    className="cursor-pointer text-blue-600 hover:underline"
                                                    onClick={() =>
                                                        handleEdit(data)
                                                    }
                                                >
                                                    Edit
                                                </Label>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={11}
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
                {openEditDocument && editingDocument && (
                    <EditDocument
                        open={openEditDocument}
                        setOpen={setOpenEditDocument}
                        document={editingDocument}
                    />
                )}
                {openViewDocument && viewingDocument && (
                    <ViewDocument
                        open={openViewDocument}
                        setOpen={setOpenViewDocument}
                        document={viewingDocument}
                    />
                )}
            </div>
        </AppLayout>
    );
}
