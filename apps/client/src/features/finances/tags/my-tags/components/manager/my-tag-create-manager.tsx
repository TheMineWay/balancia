import { useMyTagCreateMutation } from "@fts/finances/tags/my-tags/api/use-my-tag-create.mutation";
import { TagForm } from "@fts/finances/tags/tags/components/form/tag.form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@i18n/use-translation";
import { TAG_CREATE_SCHEMA, type TagCreateModel } from "@shared/models";
import { useForm } from "react-hook-form";
import { IoAddOutline } from "react-icons/io5";
import z from "zod";

type Props = {
	onSuccess?: CallableFunction;
};

const SCHEMA = z
	.object({
		...TAG_CREATE_SCHEMA.shape,
	})
	.required();

export const MyTagCreateManager: FC<Props> = ({ onSuccess }) => {
	const { t } = useTranslation("finances");

	const createForm = useForm<TagCreateModel>({
		resolver: zodResolver(SCHEMA),
	});

	const { mutate: createTag, isPending: isCreating } = useMyTagCreateMutation();

	return (
		<TagForm
			isMutating={isCreating}
			form={createForm}
			onSuccess={(tag) =>
				createTag(tag, {
					onSuccess: () => onSuccess?.(),
				})
			}
			submitIcon={<IoAddOutline />}
			submitText={t().tag.create.Submit}
		/>
	);
};
