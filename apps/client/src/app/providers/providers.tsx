import CoreProviders from "@providers/core.providers";
import type { WithChildren } from "src/common/types/component/component.types";

export default function Providers({ children }: Readonly<WithChildren>) {
	return <CoreProviders>{children}</CoreProviders>;
}
