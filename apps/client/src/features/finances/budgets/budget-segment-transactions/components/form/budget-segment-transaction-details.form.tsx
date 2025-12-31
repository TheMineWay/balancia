import { Form } from "@common/extended-ui/form/components/form";
import { PercentInputField } from "@common/extended-ui/form/components/numeric/percent.input-field";
import { useTranslation } from "@i18n/use-translation";
import { Button, InputWrapper, Textarea } from "@mantine/core";
import {
	BUDGET_SEGMENT_IMPUTATION_MODEL_VALUES,
	BUDGET_SEGMENT_IMPUTATION_SCHEMA,
} from "@shared/models";
import { Controller, type UseFormReturn } from "react-hook-form";
import { TbMoneybag } from "react-icons/tb";
import type z from "zod";

export const BUDGET_SEGMENT_TRANSACTION_DETAILS_FORM_VALUES_SCHEMA =
	BUDGET_SEGMENT_IMPUTATION_SCHEMA.pick({
		percent: true,
		description: true,
	});

export type BudgetSegmentTransactionDetailsFormValues = z.infer<
	typeof BUDGET_SEGMENT_TRANSACTION_DETAILS_FORM_VALUES_SCHEMA
>;

type Props = {
	form: UseFormReturn<BudgetSegmentTransactionDetailsFormValues>;
	onSuccess?: (values: BudgetSegmentTransactionDetailsFormValues) => void;

	// Form customization
	submitText: string;
	submitIcon?: React.ReactNode;
	loading?: boolean;
	disableSubmit?: boolean;

	// Limits
	maxPercent?: number;
};

export const BudgetSegmentTransactionDetailsForm: FC<Props> = ({
	form,
	onSuccess,

	// Form customization
	submitText,
	submitIcon = <TbMoneybag />,
	loading,
	disableSubmit = false,

	// Limits
	maxPercent = 100,
}) => {
	const { t, interpolated } = useTranslation("budget");

	const { handleSubmit, control, formState } = form;

	return (
		<Form onSubmit={handleSubmit((v) => onSuccess?.(v))}>
			<InputWrapper
				label={t().models["budget-segment-imputation"].percent.Label}
				description={interpolated(
					(t) =>
						t["budget-segment-imputation"].forms["segment-transaction-details"]
							.fields.percent["Max-percent"],
					{ maxPercent: maxPercent.toString() },
				)}
			>
				<Controller
					control={control}
					name="percent"
					render={({ field }) => (
						<PercentInputField
							{...field}
							max={maxPercent}
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
							maxLength={
								BUDGET_SEGMENT_IMPUTATION_MODEL_VALUES.description.maxLength
							}
							value={field.value ?? ""}
							minRows={3}
							error={Boolean(form.formState.errors.description)}
						/>
					)}
				/>
			</InputWrapper>

			<Button
				disabled={!formState.isValid || disableSubmit}
				loading={loading}
				leftSection={submitIcon}
				type="submit"
			>
				{submitText}
			</Button>
		</Form>
	);
};
