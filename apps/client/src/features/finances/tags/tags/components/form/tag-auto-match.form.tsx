import { AutoAssignForm } from "@common/automatisms/autoassign/components/form/auto-assign.form";
import type { AutoAssignFieldItem } from "@common/automatisms/autoassign/components/form/field/auto-assign-field-based.form";
import { useTranslation } from "@i18n/use-translation";
import type { TagAutoMatcherCreateModel } from "@shared/models";
import { useMemo } from "react";
import type { UseFormReturn } from "react-hook-form";

type Model = Omit<TagAutoMatcherCreateModel, "tagId">;

type Props = {
	form: UseFormReturn<Model>;
	onSuccess?: (data: Model) => void;
	loading?: boolean;

	/* Submit */
	submitText: string;
	submitIcon?: React.ReactNode;
};

export const TagAutoMatchForm: FC<Props> = ({
	form,
	onSuccess,
	submitText,
	submitIcon,
	loading = false,
}) => {
	const { t } = useTranslation("finances");

	/**
	 * Fields available for auto-matching.
	 * These should map to the fields available to auto-match in the transaction model.
	 */
	const fields = useMemo<AutoAssignFieldItem[]>(
		() => [
			{
				label: t().transaction.models.transaction.subject.Label,
				field: "subject",
			},
			{
				label: t().transaction.models.transaction.amount.Label,
				field: "amount",
			},
		],
		[t],
	);

	return (
		<AutoAssignForm
			form={form}
			fields={fields}
			onSuccess={(data) => onSuccess?.(data)}
			submitText={submitText}
			submitIcon={submitIcon}
			loading={loading}
		/>
	);
};
