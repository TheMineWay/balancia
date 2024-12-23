import CoreProviders from "@providers/core/core.providers";
import NetworkProvider from "@providers/core/network/network.provider";
import { WithChildren } from "@ts-types/common/component.types";

export default function Providers({ children }: Readonly<WithChildren>) {
  return (
    <CoreProviders>
      <NetworkProvider>{children}</NetworkProvider>
    </CoreProviders>
  );
}
