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
}

export type DocumentTypes = Omit<DocumentProps, 'id','user_id'>;
