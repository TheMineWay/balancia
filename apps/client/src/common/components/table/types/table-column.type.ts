export type TableColumn<TData extends object> = {
  label: string;
  accessorKey: keyof TData;
};
