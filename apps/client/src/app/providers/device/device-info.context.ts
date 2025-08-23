import { createContext, useContext } from "react";

type WindowInfo = Pick<Window, "innerHeight" | "innerWidth">;

interface DeviceInfoContextType {
	window: WindowInfo;

	// specific booleans
	isMobile: boolean;
}

/**
 * Context for sharing device information throughout the application.
 * Provides window dimensions and device type detection.
 */
export const deviceInfoContext = createContext<DeviceInfoContextType>(null!);

/**
 * Hook for accessing device information from the DeviceInfoProvider context.
 * Throws an error if used outside of a DeviceInfoProvider.
 */
export const useDeviceInfo = () => {
	const context = useContext(deviceInfoContext);

	if (!context)
		throw new Error("useDeviceInfo must be used within a DeviceInfoProvider");

	return context;
};
