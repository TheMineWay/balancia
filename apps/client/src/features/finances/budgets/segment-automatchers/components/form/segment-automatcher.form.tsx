import { Form } from "@common/extended-ui/form/components/form";
import { MyCategoriesSelector } from "@fts/finances/categories/my-categories/components/form/my-categories.selector";
import { useTranslation } from "@i18n/use-translation";
import { Button, Input } from "@mantine/core";
import type { BudgetSegmentCategoryAutoMatcherCreateModel } from "@shared/models";
import { useId } from "react";
import { Controller, type UseFormReturn } from "react-hook-form";

type Props = {
	form: UseFormReturn<BudgetSegmentCategoryAutoMatcherCreateModel>;
	onSuccess?: (matcher: BudgetSegmentCategoryAutoMatcherCreateModel) => void;
	submitText: string;
	submitIcon?: React.ReactNode;
	isMutating?: boolean;
	disableSubmit?: boolean;
};

export const SegmentAutomatcherForm: FC<Props> = ({
	submitText,
	submitIcon,
	form,
	isMutating,
	onSuccess,
	disableSubmit,
}) => {
	const { t: financesT } = useTranslation("finances");

	const { formState, handleSubmit, control } = form;

	const categoryFieldId = useId();

	return (
		<Form onSubmit={handleSubmit((matcher) => onSuccess?.(matcher))}>
			{/* Category */}
			<Input.Wrapper
				label={financesT().category.expressions.Category}
				labelProps={{ htmlFor: categoryFieldId }}
			>
				<Controller
					control={control}
					name="categoryId"
					render={({ field: { value, onChange } }) => (
						<MyCategoriesSelector
							value={value}
							onChange={onChange}
							triggerId={categoryFieldId}
						/>
					)}
				/>
			</Input.Wrapper>

			{/* Submit */}
			<Button
				disabled={!formState.isValid || disableSubmit}
				loading={isMutating}
				leftSection={submitIcon}
				type="submit"
			>
				{submitText}
			</Button>
		</Form>
	);
};
