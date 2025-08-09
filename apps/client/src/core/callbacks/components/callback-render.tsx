import { getCallbackByUrl } from "@core/callbacks/lib/get-callback-by-url";
import { Loader } from "@mantine/core";
import { useEffect, useMemo } from "react";

type Props = {
	children?: React.ReactNode;
};

export const CallbackRender: FC<Props> = ({ children }) => {
	const callback = useMemo(() => getCallbackByUrl(window.location.href), []);

	useEffect(() => {
		if (callback) {
			callback.invoke().catch((error: Error) => {
				console.error("Error invoking callback:", error);
			});
		}
	}, [callback]);

	if (callback)
		return (
			<div className="h-full w-full flex justify-center items-center">
				<Loader />
			</div>
		);
	else return children;
};
