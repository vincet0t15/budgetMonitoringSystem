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
    is_returned: boolean;
    returned_at?: string;
    return_notes?: string;
}

export type DocumentTypes = Omit<DocumentProps, 'id','user_id'>;
