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
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import projects from '@/routes/projects';
import { ProjectType } from '@/types/proejct';
import { useForm } from '@inertiajs/react';
import { ChangeEventHandler, SubmitEventHandler } from 'react';
interface Props {
    open: boolean;
    isOpen: (open: boolean) => void;
}
export function CreateProjectDialog({ open, isOpen }: Props) {
    const { data, setData, errors, processing, reset, post } =
        useForm<ProjectType>({
            name: '',
            description: '',
        });

    const handleInputChange: ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement
    > = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submit: SubmitEventHandler = (e) => {
        e.preventDefault();
        post(projects.store().url, {
            onSuccess: () => {
                reset();
                isOpen(false);
            },
        });
    };
    return (
        <Dialog open={open} onOpenChange={isOpen}>
            <DialogContent className="sm:max-w-sm">
                <form onSubmit={submit}>
                    <DialogHeader>
                        <DialogTitle>Create Project</DialogTitle>
                        <DialogDescription>
                            Create a new project.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4 space-y-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name-1">Name</Label>
                            <Input
                                id="name-1"
                                name="name"
                                defaultValue={data.name}
                                onChange={handleInputChange}
                            />
                            <InputError message={errors.name} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="description-1">Description</Label>
                            <Textarea
                                id="description-1"
                                name="description"
                                defaultValue={data.description}
                                onChange={handleInputChange}
                            />
                            <InputError message={errors.description} />
                        </div>
                    </div>
                    <DialogFooter className="mt-4">
                        <Button
                            onClick={() => isOpen(false)}
                            type="button"
                            variant="destructive"
                        >
                            Close
                        </Button>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
