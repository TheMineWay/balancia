import AuthWithPasswordForm from "@components/core/auth/forms/with-password/auth-with-password.form";
import { AuthContextInfo } from "@providers/core/auth/auth.provider";
import { Card } from "antd";

type Props = {
  setAuthContext: (info: AuthContextInfo) => void;
};

export default function Auth({ setAuthContext }: Readonly<Props>) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card>
        <AuthWithPasswordForm onSuccess={setAuthContext} />
      </Card>
    </div>
  );
}
