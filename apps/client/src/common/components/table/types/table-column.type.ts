export type TableColumn<
  TData extends object,
  K extends keyof TData = keyof TData
> = {
  label: string;
  accessorKey?: K;
  render?: (item: TData) => React.ReactNode;
};
