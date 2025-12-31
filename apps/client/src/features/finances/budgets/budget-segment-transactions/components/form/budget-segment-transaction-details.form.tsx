import { Form } from "@common/extended-ui/form/components/form";
import { PercentInputField } from "@common/extended-ui/form/components/numeric/percent.input-field";
import { useTranslation } from "@i18n/use-translation";
import { Button, InputWrapper, Textarea } from "@mantine/core";
import { BUDGET_SEGMENT_IMPUTATION_SCHEMA } from "@shared/models";
import { Controller, type UseFormReturn } from "react-hook-form";
import { TbMoneybag } from "react-icons/tb";
import type z from "zod";

export const BUDGET_SEGMENT_TRANSACTION_DETAILS_FORM_VALUES_SCHEMA =
	BUDGET_SEGMENT_IMPUTATION_SCHEMA.pick({
		percent: true,
		description: true,
	});

type FormValues = z.infer<
	typeof BUDGET_SEGMENT_TRANSACTION_DETAILS_FORM_VALUES_SCHEMA
>;

type Props = {
	form: UseFormReturn<FormValues>;
	onSuccess?: (values: FormValues) => void;

	// Form customization
	submitText: string;
	submitIcon?: React.ReactNode;
	loading?: boolean;
};

export const BudgetSegmentTransactionDetailsForm: FC<Props> = ({
	form,
	onSuccess,

	// Form customization
	submitText,
	submitIcon = <TbMoneybag />,
	loading,
}) => {
	const { t } = useTranslation("budget");

	const { handleSubmit, control, formState } = form;

	return (
		<Form onSubmit={handleSubmit((v) => onSuccess?.(v))}>
			<InputWrapper
				label={t().models["budget-segment-imputation"].percent.Label}
			>
				<Controller
					control={control}
					name="percent"
					render={({ field }) => (
						<PercentInputField
							{...field}
							error={Boolean(form.formState.errors.percent)}
						/>
					)}
				/>
			</InputWrapper>
			<InputWrapper
				label={t().models["budget-segment-imputation"].description.Label}
			>
				<Controller
					control={control}
					name="description"
					render={({ field }) => (
						<Textarea
							{...field}
							value={field.value ?? ""}
							minRows={3}
							error={Boolean(form.formState.errors.description)}
						/>
					)}
				/>
			</InputWrapper>

			<Button
				disabled={!formState.isValid}
				loading={loading}
				leftSection={submitIcon}
				type="submit"
			>
				{submitText}
			</Button>
		</Form>
	);
};
