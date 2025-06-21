import { ConfigProvider } from "antd";
import type { WithChildren } from "src/common/types/component/component.types";

export default function UIProviders({ children }: Readonly<WithChildren>) {
  return <ConfigProvider>{children}</ConfigProvider>;
}
