import { evaluatePermissionCondition } from "@core-fts/permission/lib/evaluate-permission-condition.util";
import type { PermissionCondition } from "@core-fts/permission/types/permission-condition.type";
import { useUserInfo } from "@providers/auth/user-info.context";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";

type Options = {
  condition: PermissionCondition;
  onUnauthorized?: CallableFunction;
  routeProtection?: boolean;
};

/**
 * Hook to evaluate permission conditions.
 */
export const useProtection = ({
  condition,
  onUnauthorized,
  routeProtection = false,
}: Options) => {
  const { permissions } = useUserInfo();
  const navigate = useNavigate();

  const isAuthorized = useMemo(() => {
    return evaluatePermissionCondition(permissions, condition);
  }, [permissions, condition]);

  useEffect(() => {
    if (!isAuthorized) {
      onUnauthorized?.();
      if (routeProtection) navigate({ to: "/" });
    }
  }, [isAuthorized, routeProtection, onUnauthorized, navigate]);

  return { isAuthorized };
};
