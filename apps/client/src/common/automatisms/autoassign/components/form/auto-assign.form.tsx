import {
	AutoAssignFieldBasedForm,
	type AutoAssignFieldItem,
} from "@common/automatisms/autoassign/components/form/field/auto-assign-field-based.form";
import {
	type AutoAssignCriteriaModel,
	AutoAssignTriggerType,
	type AutoAssignTriggerTypes,
} from "@shared/models";
import { type UseFormReturn, useWatch } from "react-hook-form";

type Props = {
	form: UseFormReturn<AutoAssignCriteriaModel>;

	// Field based
	fields: AutoAssignFieldItem[];
	onSuccess?: (data: AutoAssignCriteriaModel) => void;
};

/**
 * Component used to create a auto-match criteria.
 */
export const AutoAssignForm: FC<Props> = ({ form, fields, onSuccess }) => {
	const formState = useWatch(form);

	if (formState.type === AutoAssignTriggerType.FIELD)
		return (
			<AutoAssignFieldBasedForm
				form={form as unknown as UseFormReturn<AutoAssignTriggerTypes["field"]>}
				fields={fields}
				onSuccess={(v) =>
					onSuccess?.({ ...v, type: AutoAssignTriggerType.FIELD })
				}
			/>
		);

	return null;
};

// NOTE: if more than one mode is  available, this should render a selector to allow switching it
