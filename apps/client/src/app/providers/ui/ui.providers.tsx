import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import type { WithChildren } from "src/common/types/component/component.types";

export default function UIProviders({ children }: Readonly<WithChildren>) {
  return <MantineProvider>{children}</MantineProvider>;
}
