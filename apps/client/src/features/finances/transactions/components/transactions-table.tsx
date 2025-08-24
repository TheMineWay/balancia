import { DateRender } from "@common/extended-ui/date/components/date-render";
import { DatetimeRender } from "@common/extended-ui/date/components/datetime-render";
import { Table } from "@common/extended-ui/table/components/table";
import { useTable } from "@common/extended-ui/table/hooks/use-table";
import { useTranslation } from "@i18n/use-translation";
import { TimePrecision, type TransactionModel } from "@shared/models";

type Props = {
    data?: TransactionModel[];
    loading?: boolean;
}

export const TransactionsTable: FC<Props> = ({ data, loading = false }) => {
    const { t } = useTranslation('transaction');
    const table = useTable<TransactionModel>({ rowKey: 'id', data, columns: [
        {
            label: t().models.transaction.subject.Label,
            accessorKey: 'subject',
        },
        {
            label: t().models.transaction.amount.Label,
            accessorKey: 'amount',
        },
        {
            label: t().models.transaction.performedAt.Label,
            accessorKey: 'performedAt',
            render: (row) => row.performedAtPrecision === TimePrecision.DATE ? <DateRender date={row.performedAt} /> : <DatetimeRender date={row.performedAt}/>,
        },
    ] });

    return <Table table={table} loading={loading}/>;
};
