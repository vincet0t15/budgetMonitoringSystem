import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { DocumentProps } from '@/types/document';
import { Label } from '@/components/ui/label';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    document: DocumentProps | null;
}

export default function ViewDocument({ open, setOpen, document }: Props) {
    if (!document) return null;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="flex max-h-[80vh] max-w-2xl flex-col">
                <DialogHeader>
                    <DialogTitle>Document Details</DialogTitle>
                    <DialogDescription>
                        Serial No: {document.serial_no}
                    </DialogDescription>
                </DialogHeader>

                <div className="overflow-y-auto pr-4">
                    <div className="grid gap-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="text-xs text-gray-500 uppercase">
                                    Serial No.
                                </Label>
                                <p className="font-medium">
                                    {document.serial_no}
                                </p>
                            </div>
                            <div>
                                <Label className="text-xs text-gray-500 uppercase">
                                    Payee
                                </Label>
                                <p className="font-medium">{document.payee}</p>
                            </div>
                        </div>

                        <div>
                            <Label className="text-xs text-gray-500 uppercase">
                                Particulars
                            </Label>
                            <p className="font-medium break-words">
                                {document.particulars || '-'}
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <Label className="text-xs text-gray-500 uppercase">
                                    F.P.P
                                </Label>
                                <p className="font-medium">{document.fpp}</p>
                            </div>
                            <div>
                                <Label className="text-xs text-gray-500 uppercase">
                                    Account Code
                                </Label>
                                <p className="font-medium">
                                    {document.account_code}
                                </p>
                            </div>
                            <div>
                                <Label className="text-xs text-gray-500 uppercase">
                                    Amount
                                </Label>
                                <p className="font-medium">
                                    {document.ammount}
                                </p>
                            </div>
                        </div>

                        <div>
                            <Label className="text-xs text-gray-500 uppercase">
                                Remarks
                            </Label>
                            <p className="font-medium break-words">
                                {document.remarks || '-'}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-t pt-4">
                            <div>
                                <Label className="text-xs text-gray-500 uppercase">
                                    Status
                                </Label>
                                <p className="font-medium">
                                    {document.received_back_documents &&
                                    document.received_back_documents.length >
                                        0 &&
                                    !document.received_back_documents[
                                        document.received_back_documents
                                            .length - 1
                                    ].deleted_at
                                        ? 'Returned'
                                        : 'Pending'}
                                </p>
                            </div>
                            {document.received_back_documents &&
                                document.received_back_documents.length > 0 &&
                                !document.received_back_documents[
                                    document.received_back_documents.length - 1
                                ].deleted_at && (
                                    <div>
                                        <Label className="text-xs text-gray-500 uppercase">
                                            Returned Date
                                        </Label>
                                        <p className="font-medium">
                                            {new Date(
                                                document
                                                    .received_back_documents[
                                                    document
                                                        .received_back_documents
                                                        .length - 1
                                                ].date_recieved,
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                )}
                        </div>

                        <div>
                            <Label className="text-xs text-gray-500 uppercase">
                                Date Created
                            </Label>
                            <p className="font-medium">
                                {new Date(
                                    document.date_created,
                                ).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
