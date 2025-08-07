import type { WithChildren } from "@common/types/component/component.types";
import { WAREHOUSES } from "@constants/device-storage/warehouses.constant";
import {
	LOCAL_CONFIG_SCHEMA,
	type LocalConfig,
	LocalConfigContext,
} from "@providers/config/local-config.context";
import { WebWarehouse } from "@themineway/smart-storage-js";
import { useConnectorWatch } from "@themineway/smart-storage-react";
import { useCallback, useMemo } from "react";

const KEY = "__conf";
const DEFAULT_LOCAL_CONFIG: LocalConfig = {
	theme: {
		colorScheme: "light",
		primaryColor: "grape",
	},
};

type Props = WithChildren;

export const LocalConfigProvider: FC<Props> = ({ children }) => {
	const { value: config, connector } = useConnectorWatch<LocalConfig>(
		WebWarehouse.getConnector(WAREHOUSES.ls),
		KEY,
		LOCAL_CONFIG_SCHEMA,
	);

	const setConfig = useCallback(
		(newConfig: LocalConfig) =>
			connector.set(KEY, newConfig, LOCAL_CONFIG_SCHEMA),
		[connector],
	);

	const providerValue = useMemo(
		() => ({
			context: config ?? DEFAULT_LOCAL_CONFIG,
			setContext: setConfig,
		}),
		[config, setConfig],
	);

	return (
		<LocalConfigContext.Provider value={providerValue}>
			{children}
		</LocalConfigContext.Provider>
	);
};
