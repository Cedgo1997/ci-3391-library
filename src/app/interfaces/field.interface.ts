export interface Field {
    type: string;
    label: string;
    name: string;
    value: any;
    required: boolean;
    placeholder?: string;
    max?: number;
    min?: number;
    options?: Options[];
}

export interface Options {
    label: string;
    value: any
}