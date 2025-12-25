import { Form } from "@common/extended-ui/form/components/form";
import { PercentInputField } from "@common/extended-ui/form/components/numeric/percent.input-field";
import { useTranslation } from "@i18n/use-translation";
import { Button, Input, Textarea } from "@mantine/core";
import {
	BUDGET_SEGMENT_MODEL_VALUES,
	type BudgetSegmentCreateModel,
} from "@shared/models";
import { useId } from "react";
import { Controller, type UseFormReturn } from "react-hook-form";

type Props = {
	form: UseFormReturn<Omit<BudgetSegmentCreateModel, "budgetId">>;
	onSuccess?: (segment: Omit<BudgetSegmentCreateModel, "budgetId">) => void;
	submitText: string;
	submitIcon?: React.ReactNode;
	isMutating?: boolean;
};

export const BudgetSegmentForm: FC<Props> = ({
	submitText,
	submitIcon,
	form,
	isMutating,
	onSuccess,
}) => {
	const { t } = useTranslation("budget");

	const percentFieldId = useId();

	const { formState, handleSubmit, control } = form;

	return (
		<Form onSubmit={handleSubmit((segment) => onSuccess?.(segment))}>
			{/* Name */}
			<Controller
				control={control}
				name="name"
				render={({ field, fieldState }) => (
					<Input.Wrapper label={t().models["budget-segment"].name.Label}>
						<Input
							{...field}
							maxLength={BUDGET_SEGMENT_MODEL_VALUES.name.maxLength}
							error={fieldState.error?.message}
						/>
					</Input.Wrapper>
				)}
			/>

			{/* Description */}
			<Controller
				control={control}
				name="description"
				render={({ field }) => (
					<Input.Wrapper label={t().models["budget-segment"].description.Label}>
						<Textarea
							{...field}
							value={field.value ?? ""}
							maxLength={BUDGET_SEGMENT_MODEL_VALUES.description.maxLength}
							minRows={3}
						/>
					</Input.Wrapper>
				)}
			/>

			{/* Percent */}
			<Controller
				control={control}
				name="percent"
				render={({ field, fieldState }) => (
					<Input.Wrapper
						label={t().models["budget-segment"].percent.Label}
						labelProps={{ htmlFor: percentFieldId }}
						error={fieldState.error?.message}
					>
						<PercentInputField id={percentFieldId} {...field} />
					</Input.Wrapper>
				)}
			/>

			{/* Submit */}
			<Button
				type="submit"
				leftSection={submitIcon}
				disabled={!formState.isValid}
				loading={isMutating}
			>
				{submitText}
			</Button>
		</Form>
	);
};
