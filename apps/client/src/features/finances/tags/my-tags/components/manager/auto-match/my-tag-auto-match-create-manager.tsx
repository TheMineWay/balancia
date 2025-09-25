import { useMyTagAutoMatcherCreateMutation } from "@fts/finances/tags/my-tags/api/auto-match/use-my-tag-auto-matcher-create.mutation";
import { TagAutoMatchForm } from "@fts/finances/tags/tags/components/form/tag-auto-match.form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@i18n/use-translation";
import {
	AutoAssignTriggerMatchOption,
	AutoAssignTriggerType,
	TAG_AUTOMATCHER_CREATE_SCHEMA,
	type TagModel,
} from "@shared/models";
import { useForm } from "react-hook-form";
import { IoAddOutline } from "react-icons/io5";

type Props = {
	tag: TagModel;
	onSuccess?: () => void;
};

export const MyTagAutoMatchCreateManager: FC<Props> = ({ tag, onSuccess }) => {
	const { t: commonT } = useTranslation("common");

	const { mutate: createTagAutomatch, isPending: isCreatingTagAutomatch } =
		useMyTagAutoMatcherCreateMutation();

	const form = useForm({
		resolver: zodResolver(
			TAG_AUTOMATCHER_CREATE_SCHEMA.omit({ tagId: true }).required(),
		),
		defaultValues: {
			criteria: {
				type: AutoAssignTriggerType.FIELD,
				matchMode: AutoAssignTriggerMatchOption.EQUALS,
			},
		},
	});

	return (
		<TagAutoMatchForm
			form={form}
			submitText={
				commonT().components.automatisms["auto-matcher"].actions.Create
			}
			submitIcon={<IoAddOutline />}
			loading={isCreatingTagAutomatch}
			onSuccess={(autoAssign) =>
				createTagAutomatch(
					{ ...autoAssign, tagId: tag.id },
					{ onSuccess: () => onSuccess?.() },
				)
			}
		/>
	);
};
