import type { TFunction } from "@i18n/types/t-function.type";
import { useTranslation } from "@i18n/use-translation";
import { ActionIcon, Text } from "@mantine/core";
import type { TagModel } from "@shared/models";
import { BiTrash } from "react-icons/bi";

type Props = {
	selectedTags: TagModel[];
	setSelectedTags?: (tags: TagModel[]) => void;
	onRemove?: (tag: TagModel) => void;
};

export const TagsSelectList: FC<Props> = ({
	selectedTags,
	setSelectedTags,
	onRemove,
}) => {
	const { t } = useTranslation("finances");

	const onTagDeleteClick = (tag: TagModel) => {
		onRemove?.(tag);
		if (!setSelectedTags) return;
		setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
	};

	return (
		<div className="flex flex-col justify-between gap-4">
			{selectedTags.map((tag) => (
				<Item key={tag.id} item={tag} onDeleteClick={onTagDeleteClick} t={t} />
			))}
		</div>
	);
};

/* Internal */

type ItemProps = {
	item: TagModel;
	onDeleteClick: (item: TagModel) => void;
	t: TFunction<"finances">;
};

const Item: FC<ItemProps> = ({ item, onDeleteClick, t }) => {
	return (
		<div className="flex gap-2 justify-between">
			<Text>{item.name}</Text>
			<ActionIcon
				color="red"
				onClick={() => onDeleteClick(item)}
				aria-label={
					t().tag.components["tags-select-list"].actions["Unassign-tag"]
				}
			>
				<BiTrash />
			</ActionIcon>
		</div>
	);
};
