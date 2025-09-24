import { useAutoassignForm } from "@common/automatisms/autoassign/hooks/use-autoassign-form";
import { useMyTagAutoMatcherCreateMutation } from "@fts/finances/tags/my-tags/api/auto-match/use-my-tag-auto-matcher-create.mutation";
import { TagAutoMatchForm } from "@fts/finances/tags/tags/components/form/tag-auto-match.form";
import { useTranslation } from "@i18n/use-translation";
import type { TagModel } from "@shared/models";
import { IoAddOutline } from "react-icons/io5";

type Props = {
	tag: TagModel;
};

export const MyTagAutoMatchCreateManager: FC<Props> = ({ tag }) => {
	const { t: commonT } = useTranslation("common");

	const { mutate: createTagAutomatch, isPending: isCreatingTagAutomatch } =
		useMyTagAutoMatcherCreateMutation();

	const { form } = useAutoassignForm();

	return (
		<TagAutoMatchForm
			form={form}
			submitText={
				commonT().components.automatisms["auto-matcher"].actions.Create
			}
			submitIcon={<IoAddOutline />}
			loading={isCreatingTagAutomatch}
			onSuccess={(autoAssign) =>
				createTagAutomatch({ ...autoAssign, tagId: tag.id })
			}
		/>
	);
};
