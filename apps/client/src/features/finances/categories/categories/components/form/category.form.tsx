import { Form } from "@common/extended-ui/form/components/form";
import { useTranslation } from "@i18n/use-translation";
import { Button, Input } from "@mantine/core";
import {
	CATEGORY_MODEL_VALUES,
	type CategoryCreateModel,
} from "@shared/models";
import type { UseFormReturn } from "react-hook-form";

type Props = {
	form: UseFormReturn<CategoryCreateModel>;
	onSuccess?: (category: CategoryCreateModel) => void;
	submitText: string;
	submitIcon?: React.ReactNode;
	isMutating?: boolean;
};

export const CategoryForm: FC<Props> = ({
	form,
	onSuccess,
	submitText,
	submitIcon,
	isMutating,
}) => {
	const { t } = useTranslation("finances");

	const { formState, handleSubmit } = form;

	return (
		<Form onSubmit={handleSubmit((category) => onSuccess?.(category))}>
			{/* Name */}
			<Input.Wrapper label={t().category.models.category.name.Label}>
				<Input
					{...form.register("name")}
					maxLength={CATEGORY_MODEL_VALUES.name.maxLength}
				/>
			</Input.Wrapper>

			{/* Description */}
			<Input.Wrapper label={t().category.models.category.description.Label}>
				<Input
					{...form.register("description")}
					maxLength={CATEGORY_MODEL_VALUES.description.maxLength}
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
