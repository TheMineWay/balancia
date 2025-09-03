import { Form } from "@common/extended-ui/form/components/form";
import { useTranslation } from "@i18n/use-translation";
import { Button, Input } from "@mantine/core";
import { ACCOUNT_MODEL_VALUES, type AccountCreateModel } from "@shared/models";
import { UseFormReturn } from "react-hook-form";

type Props = {
	form: UseFormReturn<AccountCreateModel>;
	onSuccess?: (transaction: AccountCreateModel) => void;
	submitText: string;
	submitIcon?: React.ReactNode;
	isMutating?: boolean;
};

export const AccountForm: FC<Props> = ({
	submitText,
	submitIcon,
	form,
	isMutating,
	onSuccess,
}) => {
	const { t } = useTranslation("finances");

	const { formState, handleSubmit } = form;

	return (
		<Form onSubmit={handleSubmit((account) => onSuccess?.(account))}>
			{/* Name */}
			<Input.Wrapper label={t().account.models.account.name.Label}>
				<Input
					{...form.register("name")}
					maxLength={ACCOUNT_MODEL_VALUES.name.maxLength}
				/>
			</Input.Wrapper>

			{/* Description */}
			<Input.Wrapper label={t().account.models.account.description.Label}>
				<Input
					{...form.register("description")}
					maxLength={ACCOUNT_MODEL_VALUES.description.maxLength}
				/>
			</Input.Wrapper>

			{/* Submit */}
			<Button
				disabled={!formState.isValid}
				loading={isMutating}
				leftSection={submitIcon}
				type="submit"
			>
				{submitText}
			</Button>
		</Form>
	);
};
