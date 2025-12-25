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

	// Optional maximum percent to set on the percent field
	maxPercent?: number;
};

export const BudgetSegmentForm: FC<Props> = ({
	submitText,
	submitIcon,
	form,
	isMutating,
	onSuccess,
	maxPercent = 100,
}) => {
	const { t, interpolated } = useTranslation("budget");

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
						label={
							<span>
								{t().models["budget-segment"].percent.Label}
								{maxPercent !== 100 && (
									<small className="ml-1">
										(
										{interpolated(
											(t) =>
												t["my-budget-segments"].manager.fields.percent[
													"Max-percent"
												],
											{ maxPercent: maxPercent.toString() },
										)}
										)
									</small>
								)}
							</span>
						}
						labelProps={{ htmlFor: percentFieldId }}
						error={fieldState.error?.message}
					>
						<PercentInputField
							id={percentFieldId}
							max={maxPercent}
							{...field}
						/>
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
