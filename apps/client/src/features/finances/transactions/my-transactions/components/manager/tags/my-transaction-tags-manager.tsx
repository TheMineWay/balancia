import { useMyTagsByTransactionQuery } from "@fts/finances/tags/my-tags/api/transaction/use-my-tags-by-transaction.query";
import { useMyTransactionAddTagMutation } from "@fts/finances/tags/my-tags/api/transaction/use-my-transaction-add-tag.mutation";
import { useMyTransactionDeleteTagMutation } from "@fts/finances/tags/my-tags/api/transaction/use-my-transaction-delete-tag.mutation";
import { MyTagsSelector } from "@fts/finances/tags/my-tags/components/form/my-tags.selector";
import { TagsSelectList } from "@fts/finances/tags/tags/components/form/tags-select-list/tags-select-list";
import { useTranslation } from "@i18n/use-translation";
import { Loader } from "@mantine/core";
import type { TagModel, TransactionModel } from "@shared/models";
import { useCallback } from "react";

type Props = {
	transactionId: TransactionModel["id"];
};

export const MyTransactionTagsManager: FC<Props> = ({ transactionId }) => {
	const { t } = useTranslation("finances");

	const { data: { tags = [] } = {}, isLoading: isLoadingTags } =
		useMyTagsByTransactionQuery(transactionId);
	const { mutate: addTag } = useMyTransactionAddTagMutation(transactionId);
	const { mutate: removeTag } =
		useMyTransactionDeleteTagMutation(transactionId);

	/**
	 * Handles the addition of a new tag to the transaction.
	 * It checks if the tag is already associated with the transaction to avoid duplicates.
	 * If the tag is not already present, it calls the mutation function to add the tag.
	 */
	const handleAddTag = useCallback(
		(tagId: TagModel["id"] | null) => {
			if (!tagId || tags.find((tag) => tag.id === tagId)) return;
			addTag(tagId);
		},
		[addTag, tags],
	);

	/** Handles the removal of a tag from the transaction.
	 * It calls the mutation function to remove the tag by its ID.
	 */
	const handleRemoveTag = useCallback(
		(tag: TagModel) => {
			removeTag(tag.id);
		},
		[removeTag],
	);

	if (isLoadingTags)
		return (
			<div className="flex items-center justify-center h-full w-full">
				<Loader />
			</div>
		);

	return (
		<div className="flex flex-col gap-6">
			<MyTagsSelector
				onChange={handleAddTag}
				value={null}
				placeholder={t().transaction.managers.tags.form.search.Placeholder}
			/>
			<TagsSelectList selectedTags={tags} onRemove={handleRemoveTag} />
		</div>
	);
};
