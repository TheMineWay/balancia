import { useRoleUpdateMutation } from "@core-fts/role/manager/api/use-role-update.mutation";
import { RoleForm } from "@core-fts/role/manager/components/forms/role-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ROLE_EDITABLE_PROPS_SCHEMA,
  type RoleEditablePropsModel,
  type RoleModel,
} from "@shared/models";
import { useForm } from "react-hook-form";

type Props = {
  onSuccess?: (role: RoleEditablePropsModel) => void;
  role: RoleModel;
};

export const RoleUpdateManager: FC<Props> = ({ onSuccess, role }) => {
  const { mutate: createRole, isPending } = useRoleUpdateMutation(role.id);

  const updateForm = useForm({
    resolver: zodResolver(ROLE_EDITABLE_PROPS_SCHEMA),
    defaultValues: role,
  });

  return (
    <RoleForm
      form={updateForm}
      loading={isPending}
      onSuccess={(role) => {
        createRole(
          { body: role },
          {
            onSuccess: () => {
              updateForm.reset();
              onSuccess?.(role);
            },
          }
        );
      }}
    />
  );
};
