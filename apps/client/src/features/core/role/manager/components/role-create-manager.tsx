import { useRoleCreateMutation } from "@core-fts/role/manager/api/use-role-create.mutation";
import { RoleForm } from "@core-fts/role/manager/components/forms/role-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CREATE_ROLE_SCHEMA, type RoleCreateModel } from "@shared/models";
import { useForm } from "react-hook-form";

type Props = {
  onSuccess?: (role: RoleCreateModel) => void;
};

export const RoleCreateManager: FC<Props> = ({ onSuccess }) => {
  const { mutate: createRole } = useRoleCreateMutation();

  const createForm = useForm<RoleCreateModel>({
    resolver: zodResolver(CREATE_ROLE_SCHEMA),
  });

  return (
    <RoleForm
      form={createForm}
      onSuccess={(role) => {
        createRole(
          { body: role },
          {
            onSuccess: () => {
              createForm.reset();
              onSuccess?.(role);
            },
          }
        );
      }}
    />
  );
};
