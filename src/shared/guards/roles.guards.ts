import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";
import { UserRoleEnum } from "src/user/entities/user-role.enum";
import { ROLES_KEY } from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<UserRoleEnum[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
        // if the required roles are undefined we activate the guard so we return true
        if(!requiredRoles) {
            return true;
        }else{
            const ctx = GqlExecutionContext.create(context);
            const {user} = ctx.getContext().req.user;
            return requiredRoles.some((role) => user.roles?.include(role));
        }
        throw new Error("Method not implemented.");
    }
    
}