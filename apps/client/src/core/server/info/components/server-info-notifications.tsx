import { useServerInfoQuery } from "@core/server/info/api/use-server-info.query";
import { useTranslation } from "@i18n/use-translation";
import { notifications } from "@mantine/notifications";
import pkg from "@pkg";
import { Version } from "@shared/utils";
import { useEffect } from "react";
import { IoWarning } from "react-icons/io5";

export const ServerInfoNotifications: FC = () => {
	const { data: serverInfo } = useServerInfoQuery();
	const { t, interpolated } = useTranslation("common");

	useEffect(() => {
		const toClose: string[] = [];

		// Version notification
		if (serverInfo) {
			const clientVersion = Version.fromString(pkg.version);
			const serverVersion = Version.fromString(
				serverInfo.expectedClientVersion,
			);

			if (clientVersion.compareTo(serverVersion) === "LT") {
				const mismatchId = notifications.show({
					title:
						t().components["server-info"].notifications["version-mismatch"]
							.Title,
					message: interpolated(
						(t) =>
							t.components["server-info"].notifications["version-mismatch"]
								.Description,
						{
							current: clientVersion.toString(),
							required: serverVersion.toString(),
						},
					),
					autoClose: false,
					icon: <IoWarning />,
				});
				toClose.push(mismatchId);
			}
		}

		return () => toClose.forEach((id) => notifications.hide(id));
	}, [serverInfo, t, interpolated]);

	return null;
};
