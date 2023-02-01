export class Column{
    title: string;
    dataProperty: string;
    sortable: boolean;
    sortOrder: boolean;
    filterable: boolean;
}

export class rowActions{
    label: string;
    actionFor:string;
}

export class DataTableType{
    columns: Column[];
    rowActions: rowActions[];
}