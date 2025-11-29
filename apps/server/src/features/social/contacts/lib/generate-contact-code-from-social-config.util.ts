import {
	CONTACT_MODEL_VALUES,
	ContactCodeGenerationStrategy,
	type ContactCreateModel,
	type UserSocialConfigsModel,
} from "@shared/models";
import { createHash } from "crypto";

export const generateContactCodeFromSocialConfig = (
	contact: ContactCreateModel,
	config: UserSocialConfigsModel | null,
): string | null => {
	if (!config) return null;

	switch (config.contactCodeGenerationStrategy) {
		case ContactCodeGenerationStrategy.NAME_HASH: {
			const name = `${contact.name} ${contact.lastName}`.trim().toLowerCase();

			// Hash the name to create a unique code
			return createHash("sha256")
				.update(name)
				.digest("base64")
				.substring(0, CONTACT_MODEL_VALUES.code.maxLength);
		}
		case ContactCodeGenerationStrategy.UUID:
			return null; // Let the database generate a UUID
	}
};
