import { useRoleUpdateMutation } from "@core/admin/role/manager/api/use-role-update.mutation";
import { RoleForm } from "@core/admin/role/manager/components/forms/role-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@i18n/use-translation";
import {
	ROLE_EDITABLE_PROPS_SCHEMA,
	type RoleEditablePropsModel,
	type RoleModel,
} from "@shared/models";
import { useForm } from "react-hook-form";
import { IoPencil } from "react-icons/io5";

type Props = {
	onSuccess?: (role: RoleEditablePropsModel) => void;
	role: RoleModel;
};

export const RoleUpdateManager: FC<Props> = ({ onSuccess, role }) => {
	const { t } = useTranslation("role");
	const { mutate: createRole, isPending } = useRoleUpdateMutation(role.id);

	const updateForm = useForm({
		resolver: zodResolver(ROLE_EDITABLE_PROPS_SCHEMA),
		defaultValues: role,
	});

	return (
		<RoleForm
			form={updateForm}
			loading={isPending}
			submitText={t().admin.managers.update.Action}
			submitIcon={<IoPencil />}
			onSuccess={(role) => {
				createRole(
					{ body: role },
					{
						onSuccess: () => {
							updateForm.reset();
							onSuccess?.(role);
						},
					},
				);
			}}
		/>
	);
};
