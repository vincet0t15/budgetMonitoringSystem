import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { DocumentProps, DocumentTypes } from '@/types/document';
import { OfficeProps } from '@/types/office';
import { ProjectProps } from '@/types/project';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import documents from '@/routes/documents';
import { LoaderCircle } from 'lucide-react';
import { ChangeEventHandler, SubmitEventHandler, useEffect } from 'react';
import { toast } from 'sonner';
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '@/components/ui/combobox';

interface Props {
    document: DocumentProps;
    project: ProjectProps;
    offices: OfficeProps[];
}

export default function EditDocument({ document, project, offices }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Projects',
            href: '/projects',
        },
        {
            title: project.name,
            href: `/projects/${project.id}`,
        },
        {
            title: 'Edit Document',
            href: `/documents/${document.id}/edit`,
        },
    ];

    const { data, setData, processing, errors, put, reset } =
        useForm<DocumentTypes>({
            payee: document.payee,
            particulars: document.particulars,
            serial_no: document.serial_no,
            fpp: document.fpp,
            account_code: document.account_code,
            ammount: document.ammount,
            project_id: document.project_id,
            remarks: document.remarks ?? '',
            office_id: document.office_id,
        });

    const submit: SubmitEventHandler = (e) => {
        e.preventDefault();

        const payload = {
            ...data,
            ammount: data.ammount.replace(/,/g, ''),
        };

        put(documents.update(Number(document.id)).url, {
            ...payload,
            onSuccess: () => {
                toast.success('Document updated successfully');
            },
        });
    };

    const onChangeOffice = (name: string | null) => {
        const office = offices.find((o) => o.name === name);
        setData('office_id', office ? office.id : '');
    };

    const handleInputChange: ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement
    > = (e) => {
        const { name, value } = e.target;

        if (name === 'ammount') {
            let numericValue = value.replace(/,/g, '');

            if (!/^\d*\.?\d*$/.test(numericValue)) return;

            const [integerPart, decimalPart] = numericValue.split('.');

            const formattedInteger = integerPart.replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ',',
            );

            const formattedValue =
                decimalPart !== undefined
                    ? `${formattedInteger}.${decimalPart}`
                    : formattedInteger;

            setData({ ...data, [name]: formattedValue });
        } else {
            setData({ ...data, [name]: value });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Document" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold tracking-tight">Edit Document</h1>
                    <p className="text-muted-foreground">
                        Update the document details for project: <span className="font-medium text-foreground">{project.name}</span>
                    </p>
                </div>

                <form className="flex flex-col gap-6 mt-4" onSubmit={submit}>
                    <div className="grid gap-2">
                        <Label>Serial No.</Label>
                        <Input
                            value={data.serial_no}
                            name="serial_no"
                            className="w-full dark:bg-input/30"
                            placeholder="Enter serial no."
                            onChange={handleInputChange}
                        />
                        <InputError message={errors.serial_no} />
                    </div>

                    <div className="grid gap-2">
                        <Label>Office</Label>
                        <Combobox
                            items={offices.map((office) => office.name)}
                            value={
                                offices.find(
                                    (office) => office.id === data.office_id,
                                )?.name || null
                            }
                            onValueChange={onChangeOffice}
                        >
                            <ComboboxInput placeholder="Select an office" />

                            <ComboboxContent>
                                <ComboboxEmpty>No items found.</ComboboxEmpty>

                                <ComboboxList>
                                    {(name: string) => (
                                        <ComboboxItem key={name} value={name}>
                                            {name}
                                        </ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>
                        <InputError message={errors.office_id} />
                    </div>

                    <div className="grid gap-2">
                        <Label>Payee</Label>
                        <Input
                            value={data.payee}
                            name="payee"
                            placeholder="Enter payee"
                            className="w-full dark:bg-input/30"
                            onChange={handleInputChange}
                        />
                        <InputError message={errors.payee} />
                    </div>

                    <div className="grid gap-2">
                        <Label>Particulars</Label>
                        <Textarea
                            value={data.particulars}
                            name="particulars"
                            className="w-full dark:bg-input/30"
                            placeholder="Particulars"
                            onChange={handleInputChange}
                        />
                        <InputError message={errors.particulars} />
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="grid gap-2">
                            <Label>F.P.P</Label>
                            <Input
                                value={data.fpp}
                                name="fpp"
                                className="w-full dark:bg-input/30"
                                placeholder="F.P.P"
                                onChange={handleInputChange}
                            />
                            <InputError message={errors.fpp} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Account Code</Label>
                            <Input
                                value={data.account_code}
                                name="account_code"
                                className="w-full dark:bg-input/30"
                                placeholder="Account Code"
                                onChange={handleInputChange}
                            />
                            <InputError message={errors.account_code} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Amount</Label>
                            <Input
                                value={data.ammount}
                                name="ammount"
                                className="w-full dark:bg-input/30"
                                placeholder="Amount"
                                onChange={handleInputChange}
                            />
                            <InputError message={errors.ammount} />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label>Remarks</Label>
                        <Textarea
                            value={data.remarks}
                            name="remarks"
                            className="w-full dark:bg-input/30"
                            placeholder="Remarks"
                            onChange={handleInputChange}
                        />
                        <InputError message={errors.remarks} />
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => window.history.back()}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="min-w-[100px] cursor-pointer"
                            type="submit"
                            disabled={processing}
                        >
                            {processing && (
                                <LoaderCircle className="h-4 w-4 animate-spin mr-2" />
                            )}
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
