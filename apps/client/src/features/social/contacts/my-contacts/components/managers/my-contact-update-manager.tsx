import { ContactForm } from "@fts/social/contacts/contacts/components/form/contact.form";
import { useMyContactUpdateMutation } from "@fts/social/contacts/my-contacts/api/use-my-contact-update.mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@i18n/use-translation";
import {
	CONTACT_CREATE_SCHEMA,
	type ContactCreateModel,
	type ContactModel,
} from "@shared/models";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { IoPencilOutline } from "react-icons/io5";
import z from "zod";

const SCHEMA = z
	.object({
		...CONTACT_CREATE_SCHEMA.shape,
	})
	.required();

type Props = {
	onSuccess?: (contact: ContactCreateModel) => void;
	contact: ContactModel;
};

export const MyContactUpdateManager: FC<Props> = ({ onSuccess, contact }) => {
	const { t } = useTranslation("social");
	const { mutate: updateContact, isPending: isUpdating } =
		useMyContactUpdateMutation(contact.id);

	const updateForm = useForm({
		resolver: zodResolver(SCHEMA),
		defaultValues: contact,
	});

	const onFormSuccess = useCallback(
		(contactInfo: ContactCreateModel) => {
			updateContact(contactInfo, {
				onSuccess: () => onSuccess?.(contactInfo),
			});
		},
		[onSuccess, updateContact],
	);

	return (
		<ContactForm
			form={updateForm}
			submitText={t().contact["my-contacts"].manager.Actions.Edit}
			onSuccess={onFormSuccess}
			submitIcon={<IoPencilOutline />}
			isMutating={isUpdating}
		/>
	);
};
