import CoreProviders from "@core/providers/core.providers";
import { WithChildren } from "@core/types/common/component.types";

export default function Providers({ children }: Readonly<WithChildren>) {
  return <CoreProviders>{children}</CoreProviders>;
}
