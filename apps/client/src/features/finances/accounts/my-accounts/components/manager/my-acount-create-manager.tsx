import { AccountForm } from "@fts/finances/accounts/accounts/components/form/account.form";
import { useMyAccountCreateMutation } from "@fts/finances/accounts/my-accounts/api/use-my-account-create.mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@i18n/use-translation";
import { ACCOUNT_CREATE_SCHEMA, type AccountCreateModel } from "@shared/models";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { IoAddOutline } from "react-icons/io5";
import z from "zod";

const SCHEMA = z
	.object({
		...ACCOUNT_CREATE_SCHEMA.shape,
	})
	.required();

type Props = {
	onSuccess?: (account: AccountCreateModel) => void;
};

export const MyAccountCreateManager: FC<Props> = ({ onSuccess }) => {
	const { t } = useTranslation("finances");
	const { mutate: createAccount, isPending: isCreating } =
		useMyAccountCreateMutation();

	const createForm = useForm({
		resolver: zodResolver(SCHEMA),
	});

	const onFormSuccess = useCallback(
		(newAccount: AccountCreateModel) => {
			createAccount(newAccount, {
				onSuccess: () => onSuccess?.(newAccount),
			});
		},
		[onSuccess, createAccount],
	);

	return (
		<AccountForm
			form={createForm}
			submitText={t().account.create.Submit}
			onSuccess={onFormSuccess}
			submitIcon={<IoAddOutline />}
			isMutating={isCreating}
		/>
	);
};
