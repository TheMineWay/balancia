import { Form } from "@common/extended-ui/form/components/form";
import { useTranslation } from "@i18n/use-translation";
import { Button, Input } from "@mantine/core";
import { TAG_MODEL_VALUES, type TagCreateModel } from "@shared/models";
import type { UseFormReturn } from "react-hook-form";

type Props = {
	form: UseFormReturn<TagCreateModel>;
	onSuccess?: (tag: TagCreateModel) => void;
	submitText: string;
	submitIcon?: React.ReactNode;
	isMutating?: boolean;
};

export const TagForm: FC<Props> = ({
	form,
	onSuccess,
	isMutating,
	submitText,
	submitIcon,
}) => {
	const { t } = useTranslation("finances");

	const { formState, handleSubmit } = form;

	return (
		<Form onSubmit={handleSubmit((tag) => onSuccess?.(tag))}>
			{/* Name */}
			<Input.Wrapper label={t().tag.models.tag.name.Label}>
				<Input
					{...form.register("name")}
					maxLength={TAG_MODEL_VALUES.name.maxLength}
				/>
			</Input.Wrapper>

			{/* Description */}
			<Input.Wrapper label={t().tag.models.tag.description.Label}>
				<Input
					{...form.register("description")}
					maxLength={TAG_MODEL_VALUES.description.maxLength}
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
