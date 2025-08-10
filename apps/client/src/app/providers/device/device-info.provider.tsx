import type { WithChildren } from "@common/extended-ui/general/types/component.types";
import { deviceInfoContext } from "@providers/device/device-info.context";
import { useEffect, useMemo, useState } from "react";

type Props = WithChildren;

export const DeviceInfoProvider: FC<Props> = ({ children }) => {
	// States
	const [windowSizeInfo, setWindowSizeInfo] = useState<
		Pick<Window, "innerWidth" | "innerHeight">
	>({
		innerHeight: window.innerHeight,
		innerWidth: window.innerWidth,
	});

	// State modifiers
	useEffect(() => {
		const handleResize = () => {
			setWindowSizeInfo({
				innerHeight: window.innerHeight,
				innerWidth: window.innerWidth,
			});
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	// Build info objects

	const value = useMemo(
		() => ({
			window: { ...windowSizeInfo },
			// Booleans
			...{
				isMobile: windowSizeInfo.innerWidth < 768,
			},
		}),
		[windowSizeInfo],
	);

	return (
		<deviceInfoContext.Provider value={value}>
			{children}
		</deviceInfoContext.Provider>
	);
};
