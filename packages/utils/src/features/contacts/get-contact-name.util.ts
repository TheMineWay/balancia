import type { ContactModel } from "@shared/models";

/**
 * Returns the full name of a contact, combining name and optional lastName, trimmed.
 */
export function getContactName(contact: ContactModel): string {
	const fullName = [contact.name, contact.lastName].filter(Boolean).join(" ");
	return fullName.trim();
}
