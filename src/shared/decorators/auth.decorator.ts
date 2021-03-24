import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GqlAuthGuard } from "../guards/gql-auth-guard";
import { UserRoleEnum } from "../../user/entities/user-role.enum";
import { RolesGuard } from "../guards/roles.guards";

export function Auth(...roles) {
    return applyDecorators(
        SetMetadata('roles',roles),
        UseGuards(GqlAuthGuard, RolesGuard),
    );
}