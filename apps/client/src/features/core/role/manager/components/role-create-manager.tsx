import { useRoleCreateMutation } from "@core-fts/role/manager/api/use-role-create.mutation";
import { RoleForm } from "@core-fts/role/manager/components/forms/role-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@i18n/use-translation";
import {
	ROLE_EDITABLE_PROPS_SCHEMA,
	type RoleEditablePropsModel,
} from "@shared/models";
import { useForm } from "react-hook-form";
import { IoAddOutline } from "react-icons/io5";

type Props = {
	onSuccess?: (role: RoleEditablePropsModel) => void;
};

export const RoleCreateManager: FC<Props> = ({ onSuccess }) => {
	const { t } = useTranslation("role");
	const { mutate: createRole, isPending } = useRoleCreateMutation();

	const createForm = useForm({
		resolver: zodResolver(ROLE_EDITABLE_PROPS_SCHEMA),
	});

	return (
		<RoleForm
			form={createForm}
			loading={isPending}
			submitText={t().admin.managers.create.Action}
			submitIcon={<IoAddOutline />}
			onSuccess={(role) => {
				createRole(
					{ body: role },
					{
						onSuccess: () => {
							createForm.reset();
							onSuccess?.(role);
						},
					},
				);
			}}
		/>
	);
};
