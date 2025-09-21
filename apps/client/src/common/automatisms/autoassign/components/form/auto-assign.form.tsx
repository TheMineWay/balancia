import {
	AutoAssignFieldBasedForm,
	type AutoAssignFieldItem,
} from "@common/automatisms/autoassign/components/form/field/auto-assign-field-based.form";
import { Form } from "@common/extended-ui/form/components/form";
import { useTranslation } from "@i18n/use-translation";
import { Button, Input, InputWrapper } from "@mantine/core";
import {
	AUTO_ASSIGN_METADATA_MODEL_VALUES,
	type AutoAssignModel,
	AutoAssignTriggerType,
	type AutoAssignTriggerTypes,
} from "@shared/models";
import { type UseFormReturn, useWatch } from "react-hook-form";

type Props = {
	form: UseFormReturn<AutoAssignModel>;

	// Field based
	fields: AutoAssignFieldItem[];
	onSuccess?: (data: AutoAssignModel) => void;

	/* Submit */
	submitText: string;
	submitIcon?: React.ReactNode;
};

/**
 * Component used to create a auto-match criteria.
 */
export const AutoAssignForm: FC<Props> = ({
	form,
	fields,
	onSuccess,
	submitText,
	submitIcon,
}) => {
	const { t } = useTranslation("common");

	return (
		<Form onSubmit={form.handleSubmit((data) => onSuccess?.(data))}>
			{/* Metadata fields */}
			{/* Name */}
			<InputWrapper
				label={
					t().components.automatisms["auto-matcher"].forms.metadata.name.Label
				}
			>
				<Input
					{...form.register("name")}
					maxLength={AUTO_ASSIGN_METADATA_MODEL_VALUES.name.maxLength}
				/>
			</InputWrapper>

			{/* Description */}
			<InputWrapper
				label={
					t().components.automatisms["auto-matcher"].forms.metadata.description
						.Label
				}
			>
				<Input
					{...form.register("description")}
					maxLength={AUTO_ASSIGN_METADATA_MODEL_VALUES.description.maxLength}
				/>
			</InputWrapper>

			{/* Extend fields by match mode */}
			<MatchModeForm form={form} fields={fields} />

			<Button type="submit" leftSection={submitIcon}>
				{submitText}
			</Button>
		</Form>
	);
};

type MatchModeFormProps = {
	form: UseFormReturn<AutoAssignModel>;
	fields: AutoAssignFieldItem[];
};

const MatchModeForm: FC<MatchModeFormProps> = ({ form, fields }) => {
	const formState = useWatch(form);

	if (formState.criteria?.type === AutoAssignTriggerType.FIELD)
		return (
			<AutoAssignFieldBasedForm
				form={form as unknown as UseFormReturn<AutoAssignTriggerTypes["field"]>}
				fields={fields}
			/>
		);

	return null;
};

// NOTE: if more than one mode is  available, this should render a selector to allow switching it
