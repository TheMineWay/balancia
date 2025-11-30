import {
	type DeviceContact,
	generateDeviceContactPicker,
} from "@fts/social/contacts/contacts/lib/device-contact-picker";
import { useTranslation } from "@i18n/use-translation";
import { ActionIcon, Modal } from "@mantine/core";
import { lazy, Suspense, useCallback, useMemo, useState } from "react";
import { IoPhonePortraitOutline } from "react-icons/io5";

const Refiner = lazy(() =>
	import("./device-contacts-refiner").then((mod) => ({
		default: mod.DeviceContactsRefiner,
	})),
);

type Props = {
	buttonProps?: Omit<React.ComponentProps<typeof ActionIcon>, "onClick">;
};

export const DeviceContactsSelector: FC<Props> = (props) => {
	const deviceContactPicker = useMemo(() => generateDeviceContactPicker(), []);

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
}) => {
	const { t } = useTranslation("social");

	const [selectedDeviceContacts, setSelectedDeviceContacts] = useState<
		DeviceContact[]
	>([]);
	const pickContactFromDevice = useCallback(async () => {
		const contacts = await deviceContactPicker.pick();
		setSelectedDeviceContacts(contacts);
	}, [deviceContactPicker]);

	// TODO: handle bulk create contacts

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
					<Refiner contacts={selectedDeviceContacts} />
				</Suspense>
			</Modal>
		</>
	);
};
