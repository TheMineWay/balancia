import type { WithChildren } from "@common/extended-ui/general/types/component.types";
import { CoreProviders } from "@providers/core.providers";

export const Providers: FC<WithChildren> = ({ children }) => {
	return <CoreProviders>{children}</CoreProviders>;
};
