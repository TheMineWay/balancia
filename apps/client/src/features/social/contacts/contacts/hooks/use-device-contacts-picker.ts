import { generateDeviceContactPicker } from "@fts/social/contacts/contacts/lib/device-contact-picker";
import { useMemo } from "react";

export const useDeviceContactsPicker = () => {
	const manager = useMemo(() => generateDeviceContactPicker(), []);

	return {
		manager,
	};
};
