import type { WithChildren } from "@common/extended-ui/general/types/component.types";
import CoreProviders from "@providers/core.providers";

export default function Providers({ children }: Readonly<WithChildren>) {
	return <CoreProviders>{children}</CoreProviders>;
}
