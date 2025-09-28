import { useMyTagAutoMatcherUpdateMutation } from "@fts/finances/tags/my-automatcher/api/use-my-tag-auto-matcher-update.mutation";
import { TagAutoMatchForm } from "@fts/finances/tags/tags/components/form/tag-auto-match.form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@i18n/use-translation";
import {
	TAG_AUTOMATCHER_CREATE_SCHEMA,
	type TagAutomatcherModel,
	type TagModel,
} from "@shared/models";
import { useForm } from "react-hook-form";
import { IoPencilOutline } from "react-icons/io5";

type Props = {
	autoMatcher: TagAutomatcherModel;
	tag: TagModel;
	onSuccess?: () => void;
};

export const MyTagAutoMatchUpdateManager: FC<Props> = ({
	autoMatcher,
	tag,
	onSuccess,
}) => {
	const { t: commonT } = useTranslation("common");

	const { mutate: updateTagAutomatch, isPending: isCreatingTagAutomatch } =
		useMyTagAutoMatcherUpdateMutation(autoMatcher.id);

	const form = useForm({
		resolver: zodResolver(
			TAG_AUTOMATCHER_CREATE_SCHEMA.omit({ tagId: true }).required(),
		),
		defaultValues: autoMatcher,
	});

	return (
		<TagAutoMatchForm
			form={form}
			submitText={
				commonT().components.automatisms["auto-matcher"].managers.edit.Submit
			}
			submitIcon={<IoPencilOutline />}
			loading={isCreatingTagAutomatch}
			onSuccess={(autoAssign) =>
				updateTagAutomatch(
					{ ...autoAssign, tagId: tag.id },
					{ onSuccess: () => onSuccess?.() },
				)
			}
		/>
	);
};
