import { AccountForm } from "@fts/finances/accounts/accounts/components/form/account.form";
import { useMyAccountUpdateMutation } from "@fts/finances/accounts/my-accounts/api/use-my-account-update.mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@i18n/use-translation";
import {
	ACCOUNT_CREATE_SCHEMA,
	type AccountCreateModel,
	type AccountModel,
} from "@shared/models";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { IoPencilOutline } from "react-icons/io5";
import z from "zod";

const SCHEMA = z
	.object({
		...ACCOUNT_CREATE_SCHEMA.shape,
	})
	.required();

type Props = {
	onSuccess?: (account: AccountCreateModel) => void;
	account: AccountModel;
};

export const MyAccountUpdateManager: FC<Props> = ({ onSuccess, account }) => {
	const { t } = useTranslation("finances");
	const { mutate: updateAccount, isPending: isUpdating } =
		useMyAccountUpdateMutation(account.id);

	const updateForm = useForm({
		resolver: zodResolver(SCHEMA),
		defaultValues: account,
	});

	const onFormSuccess = useCallback(
		(accountInfo: AccountCreateModel) => {
			updateAccount(accountInfo, {
				onSuccess: () => onSuccess?.(accountInfo),
			});
		},
		[onSuccess, updateAccount],
	);

	return (
		<AccountForm
			form={updateForm}
			submitText={t().account.update.Submit}
			onSuccess={onFormSuccess}
			submitIcon={<IoPencilOutline />}
			isMutating={isUpdating}
		/>
	);
};
