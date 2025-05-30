import { getCallbackByUrl } from "@core/callbacks/get-callback-by-url";
import { useEffect, useMemo } from "react";

type Props = {
  children?: React.ReactNode;
};

export const CallbackRender: FC<Props> = ({ children }) => {
  const callback = useMemo(() => getCallbackByUrl(window.location.href), []);

  useEffect(() => {
    if (callback) {
      callback.invoke().catch((error) => {
        console.error("Error invoking callback:", error);
      });
    }
  }, [callback]);

  if (!callback) return children;
};
