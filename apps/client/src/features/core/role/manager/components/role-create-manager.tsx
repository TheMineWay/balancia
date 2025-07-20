import { RoleForm } from "@core-fts/role/manager/components/forms/role-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CREATE_ROLE_SCHEMA, type RoleCreateModel } from "@shared/models";
import { useForm } from "react-hook-form";

export const RoleCreateManager: FC = () => {
  const createForm = useForm<RoleCreateModel>({
    resolver: zodResolver(CREATE_ROLE_SCHEMA),
  });

  return <RoleForm form={createForm} onSuccess={(role) => console.log(role)} />;
};
