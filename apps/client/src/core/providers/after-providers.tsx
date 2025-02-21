import { useSyncAccountInfo } from "@core/hooks/auth/use-sync-account-info";
import { WithChildren } from "@ts-types/common/component.types";

type Props = WithChildren;

export default function AfterProviders({ children }: Readonly<Props>) {
    // Load hook to ensure account info is up-to-date
    useSyncAccountInfo();

    return children;
}