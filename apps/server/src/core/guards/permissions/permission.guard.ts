// src/common/guards/permissions.guard.ts
import { PERMISSIONS_DECORATOR_KEY } from "@core/guards/permissions/permission.decorator";

import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import type { JwtToken, Permission } from "@shared/models";
import { Request } from "express";

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_DECORATOR_KEY,
      [context.getHandler(), context.getClass()],
    ) as Permission[];
    if (!requiredPermissions || requiredPermissions.length === 0) return true;

    const request: Request = context.switchToHttp().getRequest();
    const user = request.user as JwtToken;

    const userPermissions: Permission[] = []; // TODO: load from cache
    if (!user || !userPermissions) return false;

    const hasPermission = requiredPermissions.every((permission) =>
      userPermissions.includes(permission),
    );
    if (!hasPermission) {
      throw new ForbiddenException("Insufficient permissions");
    }

    return true;
  }
}
