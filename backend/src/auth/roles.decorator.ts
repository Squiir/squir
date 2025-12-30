import { SetMetadata } from "@nestjs/common";
import { UserRole } from "@prisma/client";

export const ROLES_KEY = "roles";

/**
 * Decorator to specify which roles are allowed to access a route
 * Usage: @Roles(UserRole.ADMIN, UserRole.PROFESSIONAL)
 */
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
