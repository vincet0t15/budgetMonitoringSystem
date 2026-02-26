import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import documents from '@/routes/documents';
import { DocumentTypes } from '@/types/document';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { ChangeEventHandler, SubmitEventHandler } from 'react';
import { toast } from 'sonner';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    projectId: number;
}
export default function CreateDocument({ open, setOpen, projectId }: Props) {
    const { data, setData, processing, errors, post, reset } =
        useForm<DocumentTypes>({
            payee: '',
            particulars: '',
            serial_no: '',
            fpp: '',
            account_code: '',
            ammount: '',
            project_id: projectId,
            remarks: '',
        });

    const submit: SubmitEventHandler = (e) => {
        e.preventDefault();
        post(documents.store().url, {
            onSuccess: (response: { props: FlashProps }) => {
                toast.success(response.props.flash?.success);
                reset();
                setOpen(false);
            },
        });
    };

    const handleInputChange: ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement
    > = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <form className="flex flex-col gap-6" onSubmit={submit}>
                    <DialogHeader>
                        <DialogTitle>Create Document</DialogTitle>
                        <DialogDescription>
                            Fill in the details below to create a new document.
                        </DialogDescription>
                    </DialogHeader>

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
                    <DialogFooter>
                        <Button
                            className="w-full cursor-pointer"
                            type="submit"
                            disabled={processing}
                        >
                            {processing && (
                                <LoaderCircle className="h-4 w-4 animate-spin" />
                            )}
                            Create
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
