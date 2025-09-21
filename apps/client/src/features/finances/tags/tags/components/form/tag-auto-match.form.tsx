import { AutoAssignForm } from "@common/automatisms/autoassign/components/form/auto-assign.form";
import type { AutoAssignCriteriaModel } from "@shared/models";
import type { UseFormReturn } from "react-hook-form";

type Props = {
	form: UseFormReturn<AutoAssignCriteriaModel>;
	onSuccess?: (data: AutoAssignCriteriaModel) => void;
};

export const TagAutoMatchForm: FC<Props> = ({ form, onSuccess }) => {
	return <AutoAssignForm form={form} fields={[]} onSuccess={onSuccess} />;
};
