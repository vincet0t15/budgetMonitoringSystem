export interface ReceivedBackDocument {
    id: number;
    document_id: number;
    received_by: number;
    date_recieved: string;
    deleted_at?: string;
    created_at: string;
    updated_at: string;
}

export interface DocumentProps {
    id: number;
    date_created: string;
    payee: string;
    particulars: string;
    serial_no: string;
    fpp: string;
    account_code: string;
    ammount: string;
    project_id: number;
    user_id: number;
    remarks?: string;
    received_back_documents?: ReceivedBackDocument[];
}

export type DocumentTypes = Omit<DocumentProps, 'id','user_id','received_back_documents'>;
