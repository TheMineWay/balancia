import type { WithChildren } from "@common/extended-ui/general/types/component.types";
import { ServerInfoNotifications } from "@core/server/info/components/server-info-notifications";

type Props = WithChildren;

export const AfterProviders: FC<Props> = ({ children }) => {
	return (
		<>
			<ServerInfoNotifications />
			{children}
		</>
	);
};
