import { TransactionForm } from "@fts/finances/transactions/components/forms/transaction.form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@i18n/use-translation";
import { TRANSACTION_CREATE_SCHEMA } from "@shared/models";
import { useForm } from "react-hook-form";
import { IoAddOutline } from "react-icons/io5";

export const MyTransactionCreateManager: FC = () => {
    const { t } = useTranslation('transaction');

    const createForm = useForm({
        resolver: zodResolver(TRANSACTION_CREATE_SCHEMA.required()),
        defaultValues: {
            amount: 0,
        },
    });
    
    return <TransactionForm form={createForm} submitText={t().create.Title} submitIcon={<IoAddOutline/>}/>;
}
