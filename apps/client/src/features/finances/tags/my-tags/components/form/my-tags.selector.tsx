import {
	SelectSearch,
	type SelectSearchProps,
} from "@common/extended-ui/form/components/search/select-search";
import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { usePagination } from "@core/pagination/hooks/use-pagination";
import { endpointQuery } from "@core/requests/lib/endpoint-query.util";
import { useSearch } from "@core/search/hooks/use-search";
import { useMyTagsListQuery } from "@fts/finances/tags/my-tags/api/use-my-tags-list.query";
import { useTranslation } from "@i18n/use-translation";
import { MY_TAGS_CONTROLLER } from "@shared/api-definition";
import type { TagModel } from "@shared/models";
import { useCallback, useMemo } from "react";
import { FaRegFolder } from "react-icons/fa6";

type Props = {
	onChange?: (tagId: TagModel["id"] | null) => void;
	value: TagModel["id"] | null;
} & Omit<
	SelectSearchProps<TagModel["id"]>,
	"data" | "search" | "value" | "setValue" | "getKey"
>;

export const MyTagsSelector: FC<Props> = ({ onChange, value, ...props }) => {
	const { t } = useTranslation("finances");
	const pagination = usePagination();
	const search = useSearch<TagModel>({});
	const { request } = useAuthenticatedRequest();

	const { data: tags = { items: [], total: 0 } } = useMyTagsListQuery({
		pagination,
		search,
	});

	const options = useMemo(
		() =>
			tags.items.map((item) => ({
				label: item.name,
				value: item.id,
			})),
		[tags],
	);

	const valueFetch = useCallback(
		async (tagId: TagModel["id"]) => {
			const selectedTag = await endpointQuery(
				MY_TAGS_CONTROLLER,
				"getTag",
				{ id: tagId.toString() },
				request,
				{},
			)();

			return {
				value: selectedTag.id,
				label: selectedTag.name,
			};
		},
		[request],
	);

	return (
		<SelectSearch<TagModel["id"]>
			data={options}
			getKey={(v) => v}
			search={search.debouncedSearchManager}
			setValue={(v) => onChange?.(v)}
			value={value}
			valueFetch={valueFetch}
			leftSection={<FaRegFolder />}
			aria-label={t().tag.expressions.Tag}
			{...props}
		/>
	);
};
