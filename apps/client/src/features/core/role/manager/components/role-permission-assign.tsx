import { UnknownErrorAlert } from "@common/components/status/unknown-error-alert";
import { useRolePermissionsQuery } from "@core-fts/role/manager/api/role-permission/use-role-permissions.query";
import { useTranslation } from "@i18n/use-translation";
import { Checkbox, Loader, Tooltip } from "@mantine/core";
import { PERMISSIONS, type Permission, type RoleModel } from "@shared/models";
import { useId, useState } from "react";

type Props = {
  role: RoleModel;
};

type PermissionsCheckState = Permission[];

/**
 * RolePermissionAssign component
 * This component allows the assignment of permissions to a role.
 */
export const RolePermissionAssign: FC<Props> = ({ role }) => {
  const {
    data: { permissions: rolePermissions = [] } = {},
    isLoading: isLoadingPermissions,
    isError: isErrorPermissions,
  } = useRolePermissionsQuery(role.id);
  const [permissions, setPermissions] =
    useState<PermissionsCheckState>(rolePermissions);

  if (isLoadingPermissions)
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );

  if (isErrorPermissions) return <UnknownErrorAlert />;

  return (
    <div className="flex flex-col gap-4">
      <PermissionCheck selected={permissions} onChange={setPermissions} />
    </div>
  );
};

/* Internal */

type PermissionCheckProps = {
  selected: Permission[];
  onChange: (permissions: Permission[]) => void;
};

const PermissionCheck: FC<PermissionCheckProps> = ({ selected, onChange }) => {
  return (
    <div className="flex flex-col gap-4">
      {PERMISSIONS.map((permission) => (
        <div key={permission} className="flex gap-1">
          <RenderPermission
            selected={selected.includes(permission)}
            onChecked={() => onChange([...selected, permission])}
            onUnchecked={() =>
              onChange(selected.filter((p) => p !== permission))
            }
            permission={permission}
          />
        </div>
      ))}
    </div>
  );
};

type RenderPermissionProps = {
  permission: Permission;
  selected: boolean;
  onChecked: CallableFunction;
  onUnchecked: CallableFunction;
};

const RenderPermission: FC<RenderPermissionProps> = ({
  permission,
  selected,
  onChecked,
  onUnchecked,
}) => {
  const id = useId();
  const { t } = useTranslation("role");

  return (
    <div className="flex gap-2 items-center">
      <Checkbox
        id={id}
        checked={selected}
        onChange={(e) => (e.target.checked ? onChecked() : onUnchecked())}
      />
      <Tooltip label={t().permissions[permission].Description}>
        <label htmlFor={id}>{t().permissions[permission].Name}</label>
      </Tooltip>
    </div>
  );
};
