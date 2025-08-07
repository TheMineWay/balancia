import { createContext, useContext } from "react";

type WindowInfo = Pick<Window, "innerHeight" | "innerWidth">;

interface DeviceInfoContextType {
	window: WindowInfo;

	// specific booleans
	isMobile: boolean;
}

export const deviceInfoContext = createContext<DeviceInfoContextType>(null!);

export const useDeviceInfo = () => {
	const context = useContext(deviceInfoContext);

	if (!context)
		throw new Error("useDeviceInfo must be used within a DeviceInfoProvider");

	return context;
};
