import { AuthContextInfo } from "@providers/core/auth/auth.provider";

type Props = {
  setAuthContext: (info: AuthContextInfo) => void;
};

export default function Auth({ setAuthContext }: Readonly<Props>) {
  return <div>AUTH</div>;
}
