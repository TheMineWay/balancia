import { useAutoassignForm } from "@common/automatisms/autoassign/hooks/use-autoassign-form";
import { TagAutoMatchForm } from "@fts/finances/tags/tags/components/form/tag-auto-match.form";
import type { TagModel } from "@shared/models";

type Props = {
	tag: TagModel;
};

export const MyTagAutoMatchManager: FC<Props> = ({ tag }) => {
	const { form } = useAutoassignForm();

	return <TagAutoMatchForm form={form} />;
};
