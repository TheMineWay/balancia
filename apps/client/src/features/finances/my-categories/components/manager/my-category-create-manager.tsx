import { CategoryForm } from "@fts/finances/categories/components/form/category.form";
import { useMyCategoryCreateMutation } from "@fts/finances/my-categories/api/use-my-category-create.mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@i18n/use-translation";
import {
	CATEGORY_CREATE_SCHEMA,
	type CategoryCreateModel,
} from "@shared/models";
import { useForm } from "react-hook-form";
import z from "zod";

const SCHEMA = z
	.object({
		...CATEGORY_CREATE_SCHEMA.shape,
	})
	.required();

type Props = {
	onSuccess?: () => void;
};

export const MyCategoryCreateManager: FC<Props> = ({ onSuccess }) => {
	const { t } = useTranslation("finances");

	const createForm = useForm<CategoryCreateModel>({
		resolver: zodResolver(SCHEMA),
	});

	const { mutate: createCategory, isPending: isCreating } =
		useMyCategoryCreateMutation();

	return (
		<CategoryForm
			form={createForm}
			isMutating={isCreating}
			onSuccess={(category) => {
				createCategory(category, {
					onSuccess: () => onSuccess?.(),
				});
			}}
			submitText={t().category.create.Submit}
		/>
	);
};
