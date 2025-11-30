import { Table } from "@common/extended-ui/table/components/table";
import { useTable } from "@common/extended-ui/table/hooks/use-table";
import { useTranslation } from "@i18n/use-translation";
import { ActionIcon, CopyButton, Group, Text } from "@mantine/core";
import type { ContactModel } from "@shared/models";
import { getContactName } from "@shared/utils";
import { BiEdit, BiTrash } from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";
import { IoCopyOutline } from "react-icons/io5";

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
				classNames: {
					cell: "min-w-24",
				},
			},
			{
				label: commonT().expressions.Code,
				accessorKey: "code",
				render: (item) => (
					<Group>
						{item.code}
						<CopyButton value={item.code}>
							{({ copied, copy }) => (
								<ActionIcon
									onClick={copy}
									aria-label={commonT().expressions.Copy}
								>
									{copied ? <FaCheck /> : <IoCopyOutline />}
								</ActionIcon>
							)}
						</CopyButton>
					</Group>
				),
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
