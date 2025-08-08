import type { WithChildren } from "@common/extended-ui/general/types/component.types";

type Props = WithChildren;

export default function AfterProviders({ children }: Readonly<Props>) {
	return <>{children}</>;
}
