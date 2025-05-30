import AuthentikAuth from "@core/components/auth/sign-in/authentik/authentik-auth";
import type { AuthContextInfo } from "@core/providers/auth/auth.context";
import { Card } from "antd";
import clsx from "clsx";
import styles from "./auth.module.pcss";

type Props = {
  setAuthContext: (info: AuthContextInfo) => void;
};

export default function Auth({ setAuthContext }: Readonly<Props>) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className={clsx(
          styles.container,
          "flex flex-col lg:flex-row items-center lg:justify-between gap-2"
        )}
      >
        <div className="w-full lg:w-1/2 mx-auto">
          <Card className="w-full">
            <AuthentikAuth />
          </Card>
        </div>
      </div>
    </div>
  );
}
