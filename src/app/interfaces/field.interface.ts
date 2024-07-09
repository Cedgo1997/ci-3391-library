export interface Field {
    type: string;
    label: string;
    name: string;
    value: any;
    required: boolean;
    options?: string[];
}