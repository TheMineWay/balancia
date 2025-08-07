import type { WithChildren } from "src/common/types/component/component.types";

type Props = WithChildren;

export default function AfterProviders({ children }: Readonly<Props>) {
  return <>{children}</>;
}
