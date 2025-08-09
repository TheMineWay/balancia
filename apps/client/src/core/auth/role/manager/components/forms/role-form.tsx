import { Form } from "@common/extended-ui/form/form";
import { useTranslation } from "@i18n/use-translation";
import { Button, Input } from "@mantine/core";
import type { RoleEditablePropsModel } from "@shared/models";
import type { UseFormReturn } from "react-hook-form";

type Props = {
	form: UseFormReturn<RoleEditablePropsModel>;
	onSuccess?: (role: RoleEditablePropsModel) => void;
	loading?: boolean;
	submitText: string;
	submitIcon?: React.ReactNode;
};

export const RoleForm: FC<Props> = ({
	form,
	onSuccess,
	loading = false,
	submitText,
	submitIcon,
}) => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = form;
	const { t } = useTranslation("role");

	return (
		<Form onSubmit={handleSubmit((role) => onSuccess?.(role))}>
			<Input.Wrapper label={t().models.role.fields.name.Name}>
				<Input error={errors.name?.message} {...register("name")} />
			</Input.Wrapper>

			<Button loading={loading} leftSection={submitIcon} type="submit">
				{submitText}
			</Button>
		</Form>
	);
};
