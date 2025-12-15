import { Form } from "@common/extended-ui/form/components/form";
import { DeviceContactsSelector } from "@fts/social/contacts/contacts/components/device/device-contacts-selector";
import { useDeviceContactsPicker } from "@fts/social/contacts/contacts/hooks/use-device-contacts-picker";
import { useTranslation } from "@i18n/use-translation";
import { Button, Divider, Input } from "@mantine/core";
import { CONTACT_MODEL_VALUES, type ContactCreateModel } from "@shared/models";
import { useCallback } from "react";
import type { UseFormReturn } from "react-hook-form";

type Props = {
	form: UseFormReturn<ContactCreateModel>;
	onSuccess?: (contact: ContactCreateModel) => void;
	submitText: string;
	submitIcon?: React.ReactNode;
	isMutating?: boolean;
};

export const ContactForm: FC<Props> = ({
	submitText,
	submitIcon,
	form,
	isMutating,
	onSuccess,
}) => {
	const { t } = useTranslation("social");

	const { formState, handleSubmit } = form;

	const onDeviceContactSelected = useCallback(
		(contact: ContactCreateModel) => {
			if (!contact) return;

			form.setValue("name", contact.name);
			form.setValue("lastName", contact.lastName);
			form.setValue("email", contact.email);
			form.setValue("phone", contact.phone, { shouldValidate: true });
		},
		[form],
	);

	const { manager: deviceContactsManager } = useDeviceContactsPicker();

	return (
		<Form onSubmit={handleSubmit((contact) => onSuccess?.(contact))}>
			{deviceContactsManager && (
				<>
					<DeviceContactsSelector
						maxSelectCount={1}
						onSelect={([contact]) => {
							if (!contact) return;
							onDeviceContactSelected(contact);
						}}
					/>
					<Divider />
				</>
			)}
			{/* Name */}
			<Input.Wrapper label={t().contact.models.contact.name.Label}>
				<Input
					{...form.register("name", { required: "Name is required" })}
					maxLength={CONTACT_MODEL_VALUES.name.maxLength}
				/>
			</Input.Wrapper>

			{/* Last Name */}
			<Input.Wrapper label={t().contact.models.contact.lastName.Label}>
				<Input
					{...form.register("lastName")}
					maxLength={CONTACT_MODEL_VALUES.lastName.maxLength}
				/>
			</Input.Wrapper>

			{/* Email */}
			<Input.Wrapper label={t().contact.models.contact.email.Label}>
				<Input
					{...form.register("email")}
					type="email"
					maxLength={CONTACT_MODEL_VALUES.email.maxLength}
				/>
			</Input.Wrapper>

			{/* Phone */}
			<Input.Wrapper label={t().contact.models.contact.phone.Label}>
				<Input
					{...form.register("phone")}
					type="tel"
					maxLength={CONTACT_MODEL_VALUES.phone.maxLength}
				/>
			</Input.Wrapper>

			{/* Submit */}
			<Button
				disabled={!formState.isValid}
				loading={isMutating}
				leftSection={submitIcon}
				type="submit"
			>
				{submitText}
			</Button>
		</Form>
	);
};
