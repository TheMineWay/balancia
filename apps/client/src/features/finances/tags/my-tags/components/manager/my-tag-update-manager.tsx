import { useMyTagUpdateMutation } from "@fts/finances/tags/my-tags/api/use-my-tag-update.mutation";
import { TagForm } from "@fts/finances/tags/tags/components/form/tag.form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@i18n/use-translation";
import {
	TAG_CREATE_SCHEMA,
	type TagCreateModel,
	type TagModel,
} from "@shared/models";
import { useForm } from "react-hook-form";
import { IoPencilOutline } from "react-icons/io5";
import z from "zod";

type Props = {
	tag: TagModel;
	onSuccess?: CallableFunction;
};

const SCHEMA = z
	.object({
		...TAG_CREATE_SCHEMA.shape,
	})
	.required();

export const MyTagUpdateManager: FC<Props> = ({ onSuccess, tag }) => {
	const { t } = useTranslation("finances");

	const updateForm = useForm<TagCreateModel>({
		resolver: zodResolver(SCHEMA),
		defaultValues: tag,
	});

	const { mutate: updateTag, isPending: isUpdating } = useMyTagUpdateMutation(
		tag.id,
	);

	return (
		<TagForm
			isMutating={isUpdating}
			form={updateForm}
			onSuccess={(tag) =>
				updateTag(tag, {
					onSuccess: () => onSuccess?.(),
				})
			}
			submitIcon={<IoPencilOutline />}
			submitText={t().tag.create.Submit}
		/>
	);
};
