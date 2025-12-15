import { ContactForm } from "@fts/social/contacts/contacts/components/form/contact.form";
import { useMyContactCreateMutation } from "@fts/social/contacts/my-contacts/api/use-my-contact-create.mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@i18n/use-translation";
import {
	CONTACT_CREATE_SCHEMA,
	type ContactCreateModel,
	type ContactModel,
} from "@shared/models";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { IoAddOutline } from "react-icons/io5";
import z from "zod";

const SCHEMA = z
	.object({
		...CONTACT_CREATE_SCHEMA.shape,
	})
	.required();

type Props = {
	onSuccess?: (contact: ContactModel) => void;
};

export const MyContactCreateManager: FC<Props> = ({ onSuccess }) => {
	const { t } = useTranslation("social");
	const { mutate: createContact, isPending: isCreating } =
		useMyContactCreateMutation();

	const createForm = useForm({
		resolver: zodResolver(SCHEMA),
	});

	const onFormSuccess = useCallback(
		(newContact: ContactCreateModel) => {
			createContact(newContact, {
				onSuccess: (createdContact) => onSuccess?.(createdContact),
			});
		},
		[onSuccess, createContact],
	);

	return (
		<ContactForm
			form={createForm}
			submitText={t().contact.create.Title}
			onSuccess={onFormSuccess}
			submitIcon={<IoAddOutline />}
			isMutating={isCreating}
		/>
	);
};
