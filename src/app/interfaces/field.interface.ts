export interface Field {
    type: string;
    label: string;
    name: string;
    value: any;
    required: boolean;
    options?: Options[];
}

export interface Options {
    label: string;
    value: any
}