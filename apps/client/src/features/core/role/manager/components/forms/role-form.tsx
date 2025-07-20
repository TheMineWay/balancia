import { Form } from "@common/components/form/form";
import { useTranslation } from "@i18n/use-translation";
import { Button, Input } from "@mantine/core";
import type { RoleCreateModel } from "@shared/models";
import type { UseFormReturn } from "react-hook-form";
import { IoAddOutline } from "react-icons/io5";

type Props = {
  form: UseFormReturn<RoleCreateModel>;
  onSuccess?: (role: RoleCreateModel) => void;
};

export const RoleForm: FC<Props> = ({ form, onSuccess }) => {
  const { handleSubmit, register } = form;
  const { t } = useTranslation("role");

  return (
    <Form onSubmit={handleSubmit((role) => onSuccess?.(role))}>
      <Input.Wrapper label={t().models.role.fields.name.Name}>
        <Input {...register("name")} />
      </Input.Wrapper>

      <Button leftSection={<IoAddOutline />} type="submit">
        {t().admin.managers.create.Action}
      </Button>
    </Form>
  );
};
