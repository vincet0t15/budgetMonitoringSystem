import AppLayout from '@/layouts/app-layout'
import { Head } from '@inertiajs/react'
import { User, type BreadcrumbItem } from '@/types';
import accounts from '@/routes/accounts';
import { PaginatedDataResponse } from '@/types/pagination';
import { FilterProps } from '@/types/filter';
import { Input } from '@/components/ui/input';
import { ChangeEventHandler, KeyboardEventHandler, useState } from 'react';
import Pagination from '@/components/paginationData';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Accounts',
        href: accounts.index.url(),
    },
];

interface Props {
    accountList: PaginatedDataResponse<User>
    filters: FilterProps
}
export default function index({ accountList, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    console.log(accountList)
    const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearch(e.target.value);
    };

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        const queryString = search ? search : '';
        if (e.key === 'Enter') {
            e.preventDefault();
            // router.get(
            //     offices.index.url(),
            //     {
            //         search: queryString,
            //     },
            //     {
            //         preserveState: true,
            //         replace: true,
            //     },
            // );
        }
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Accounts" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="flex items-center gap-2">
                    <div className="flex items-center w-full">
                        <Input
                            placeholder="Search..."
                            value={search}
                            onChange={handleSearch}
                            onKeyDown={handleKeyDown}
                            className="ml-auto"
                        />
                    </div>
                </div>

                <div className="w-full overflow-hidden rounded-sm border shadow-sm">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead className="font-bold text-primary">
                                    Name
                                </TableHead>

                                <TableHead className="font-bold text-primary">
                                    Status
                                </TableHead>

                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {accountList.data.length > 0 ? (
                                accountList.data.map((user, index) => (
                                    <TableRow key={index} className="text-sm">
                                        <TableCell>
                                            <span>{user.name}</span>
                                        </TableCell>
                                        <TableCell>

                                            {user.is_active ? (
                                                <Badge className="px-1.5 text-muted-foreground bg-teal-100">
                                                    <div className='flex gap-2'>
                                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                                        <span className="text-xs text-black ">
                                                            Active
                                                        </span>
                                                    </div>
                                                </Badge>

                                            ) : (
                                                <Badge className="px-1.5 text-muted-foreground bg-orange-100">
                                                    <div className='flex gap-2'>
                                                        <AlertCircle className="h-4 w-4 text-red-600" />
                                                        <span className="text-xs text-black ">
                                                            Inactive
                                                        </span>
                                                    </div>
                                                </Badge>
                                            )}
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
                    <Pagination data={accountList} />
                </div>
            </div>

        </AppLayout>
    )
}
