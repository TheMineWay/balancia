import { CategoryForm } from "@fts/finances/categories/categories/components/form/category.form";
import { useMyCategoryUpdateMutation } from "@fts/finances/categories/my-categories/api/use-my-category-update.mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@i18n/use-translation";
import {
	CATEGORY_CREATE_SCHEMA,
	type CategoryCreateModel,
	type CategoryModel,
} from "@shared/models";
import { useForm } from "react-hook-form";
import { IoPencilOutline } from "react-icons/io5";
import z from "zod";

const SCHEMA = z
	.object({
		...CATEGORY_CREATE_SCHEMA.shape,
	})
	.required();

type Props = {
	category: CategoryModel;
	onSuccess?: () => void;
};

export const MyCategoryUpdateManager: FC<Props> = ({ onSuccess, category }) => {
	const { t } = useTranslation("finances");

	const updateForm = useForm<CategoryCreateModel>({
		resolver: zodResolver(SCHEMA),
		defaultValues: category,
	});

	const { mutate: updateCategory, isPending: isUpdating } =
		useMyCategoryUpdateMutation(category.id);

	return (
		<CategoryForm
			form={updateForm}
			isMutating={isUpdating}
			onSuccess={(category) => {
				updateCategory(category, {
					onSuccess: () => onSuccess?.(),
				});
			}}
			submitIcon={<IoPencilOutline />}
			submitText={t().category.update.Submit}
		/>
	);
};
