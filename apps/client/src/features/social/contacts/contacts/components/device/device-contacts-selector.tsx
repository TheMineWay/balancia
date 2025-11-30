import { useDeviceContactsPicker } from "@fts/social/contacts/contacts/hooks/use-device-contacts-picker";
import type {
	DeviceContact,
	generateDeviceContactPicker,
} from "@fts/social/contacts/contacts/lib/device-contact-picker";
import { useTranslation } from "@i18n/use-translation";
import { ActionIcon, type ActionIconProps, Modal } from "@mantine/core";
import type { ContactCreateModel } from "@shared/models";
import { lazy, Suspense, useCallback, useState } from "react";
import { IoPhonePortraitOutline } from "react-icons/io5";

const Refiner = lazy(() =>
	import("./device-contacts-refiner").then((mod) => ({
		default: mod.DeviceContactsRefiner,
	})),
);

type Props = {
	buttonProps?: Omit<ActionIconProps, "onClick">;
	onSelect?: (contacts: ContactCreateModel[]) => void;
	maxSelectCount?: number;
};

export const DeviceContactsSelector: FC<Props> = (props) => {
	const { manager: deviceContactPicker } = useDeviceContactsPicker();

	if (!deviceContactPicker) return null;

	return <Component {...props} deviceContactPicker={deviceContactPicker} />;
};

type ComponentProps = Props & {
	deviceContactPicker: NonNullable<
		ReturnType<typeof generateDeviceContactPicker>
	>;
};

const Component: FC<ComponentProps> = ({
	buttonProps,
	deviceContactPicker,
	onSelect,
	maxSelectCount,
}) => {
	const { t } = useTranslation("social");

	const [selectedDeviceContacts, setSelectedDeviceContacts] = useState<
		DeviceContact[]
	>([]);
	const pickContactFromDevice = useCallback(async () => {
		const contacts = await deviceContactPicker.pick({
			multiple: maxSelectCount !== 1,
		});
		setSelectedDeviceContacts(contacts);
	}, [deviceContactPicker, maxSelectCount]);

	return (
		<>
			<ActionIcon
				variant="default"
				{...buttonProps}
				onClick={pickContactFromDevice}
			>
				<IoPhonePortraitOutline />
			</ActionIcon>

			{/* Selector UI */}
			<Modal
				opened={selectedDeviceContacts.length > 0}
				onClose={() => setSelectedDeviceContacts([])}
				title={t()["device-contact-refiner"].Title}
			>
				<Suspense>
					<Refiner
						contacts={selectedDeviceContacts}
						onSuccess={(contacts) => {
							onSelect?.(contacts);
							setSelectedDeviceContacts([]);
						}}
					/>
				</Suspense>
			</Modal>
		</>
	);
};
