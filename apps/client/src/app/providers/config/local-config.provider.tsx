import type { WithChildren } from "@common/extended-ui/general/types/component.types";
import { WAREHOUSES } from "@constants/device-storage/warehouses.constant";
import { MASTER_LOCALE } from "@i18n/locales/locales";
import {
    LOCAL_CONFIG_SCHEMA,
    type LocalConfig,
    localConfigContext,
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
	language: MASTER_LOCALE,
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
		<localConfigContext.Provider value={providerValue}>
			{children}
		</localConfigContext.Provider>
	);
};
