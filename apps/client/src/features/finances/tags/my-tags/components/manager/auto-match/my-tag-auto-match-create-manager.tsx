import { useAutoassignForm } from "@common/automatisms/autoassign/hooks/use-autoassign-form";
import { TagAutoMatchForm } from "@fts/finances/tags/tags/components/form/tag-auto-match.form";
import { useTranslation } from "@i18n/use-translation";
import type { TagModel } from "@shared/models";
import { IoAddOutline } from "react-icons/io5";

type Props = {
	tag: TagModel;
};

export const MyTagAutoMatchCreateManager: FC<Props> = ({ tag }) => {
	const { t: commonT } = useTranslation("common");

	const { form } = useAutoassignForm();

	return (
		<TagAutoMatchForm
			form={form}
			submitText={
				commonT().components.automatisms["auto-matcher"].actions.Create
			}
			submitIcon={<IoAddOutline />}
		/>
	);
};
