import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { Injectable, Logger } from "@nestjs/common";
import { User } from "../user/entities/user.entity";
import { Carpool } from "../carpool/entities/carpool.entity";
import { Action } from "./enums/action.enum";
import { UserRoleEnum } from "../user/entities/user-role.enum";
import { CASL_RESSOURCE_FORBIDDEN_ERROR_MESSAGE } from "../utils/constants";
import { OwnerType } from "src/generics/owner.interface";


type Subjects = InferSubjects<typeof Carpool | typeof User> | 'all'; 
export type AppAbility = Ability<[Action, Subjects]>;

/*
    T extends OwnerType means that we pass any class that have an owner in its fields. 
    Example: Carpool has an owner in its field so we could pass it
*/
@Injectable()
export class CaslAbilityFactory<T extends OwnerType> {

    createForUser(resource: T ,user: User) {
    const { can, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    // if the user is admin
    if (user.roles.indexOf(UserRoleEnum.ADMIN) > -1) {
      can(Action.Manage, 'all'); // read-write access to everything
    } else {
        // if the user is not admin
      can(Action.Read, 'all'); // read-only access to everything
    }

    // if the actual user who's trying to access the resource is the owner of the resource we allow him to update and delete
    if(resource.owner.id === user.id) {
        can(Action.Update, Carpool);
        can(Action.Delete, Carpool);
    }
    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: item => item.constructor as ExtractSubjectType<Subjects>
    });
  }
}
