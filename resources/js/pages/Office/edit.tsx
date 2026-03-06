import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import type { ChangeEventHandler, SubmitEventHandler } from 'react';
import { toast } from 'sonner';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import offices from '@/routes/offices';
import { OfficeProps, OfficeType } from '@/types/office';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    office: OfficeProps;
}
export function OfficeEditDialog({ open, setOpen, office }: Props) {
    const { data, setData, put, reset, processing, errors } =
        useForm<OfficeType>({
            name: office.name,
            code: office.code,
        });

    const handleChange: ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement
    > = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const submit: SubmitEventHandler = (e) => {
        e.preventDefault();
        put(offices.update(office.id).url, {
            preserveState: true,
            onSuccess: (response: { props: FlashProps }) => {
                toast.success(response.props.flash?.success);
                setOpen(false);
                reset();
            },
        });
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Office</DialogTitle>
                    <DialogDescription>
                        Please fill in the office details below.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submit}>
                    <div className="mb-4 grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name">Office Name</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="e.g. Office of the Municipal Mayor"
                                onChange={handleChange}
                                value={data.name}
                            />
                            <InputError message={errors.name} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="code">Office Code</Label>
                            <Input
                                id="code"
                                name="code"
                                placeholder="e.g. MO"
                                className="uppercase"
                                onChange={handleChange}
                                value={data.code}
                            />
                            <InputError message={errors.code} />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button
                            className="cursor-pointer rounded-sm bg-teal-700 text-white hover:bg-teal-800 hover:text-white"
                            type="submit"
                            disabled={processing}
                            variant={'outline'}
                        >
                            {processing && (
                                <LoaderCircle className="h-4 w-4 animate-spin" />
                            )}
                            Update Office
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
