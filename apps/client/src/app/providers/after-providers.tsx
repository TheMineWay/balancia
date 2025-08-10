import type { WithChildren } from "@common/extended-ui/general/types/component.types";

type Props = WithChildren;

export const AfterProviders: FC<Props> = ({ children }) => {
	return <>{children}</>;
};
