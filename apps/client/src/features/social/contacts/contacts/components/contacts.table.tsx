import { Table } from "@common/extended-ui/table/components/table";
import { useTable } from "@common/extended-ui/table/hooks/use-table";
import { useTranslation } from "@i18n/use-translation";
import { ActionIcon, Group, Text } from "@mantine/core";
import type { ContactModel } from "@shared/models";
import { getContactName } from "@shared/utils";
import { BiEdit, BiTrash } from "react-icons/bi";

type Props<T extends ContactModel> = {
	data?: T[];
	loading?: boolean;

	// Events
	onEditClick?: (item: T) => void;
	onDeleteClick?: (item: T) => void;
};

export const ContactsTable = <T extends ContactModel = ContactModel>({
	data = [],
	loading = false,

	// Events
	onEditClick,
	onDeleteClick,
}: Readonly<Props<T>>) => {
	const { t } = useTranslation("social");
	const { t: commonT } = useTranslation("common");

	const table = useTable<T>({
		rowKey: "id",
		data,
		columns: [
			{
				label: t().contact.models.contact.fullName.Label,
				render: (item) => <Text>{getContactName(item)}</Text>,
				accessorKey: "name",
			},
			{
				label: t().contact.models.contact.email.Label,
				accessorKey: "email",
			},
			{
				label: t().contact.models.contact.phone.Label,
				accessorKey: "phone",
			},
			{
				label: commonT().expressions.Actions,
				render: (item) => (
					<Group>
						{onEditClick && (
							<ActionIcon
								onClick={() => onEditClick(item)}
								aria-label={commonT().expressions.Edit}
							>
								<BiEdit />
							</ActionIcon>
						)}
						{onDeleteClick && (
							<ActionIcon
								onClick={() => onDeleteClick(item)}
								color="red"
								aria-label={commonT().expressions.Delete}
							>
								<BiTrash />
							</ActionIcon>
						)}
					</Group>
				),
			},
		],
	});

	return (
		<Table<T>
			table={table}
			loading={loading}
			classNames={{ root: "max-h-[25rem]" }}
		/>
	);
};
