import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import {Injectable, Logger} from '@nestjs/common';
import {User} from '../user/entities/user.entity';
import {Carpool} from '../carpool/entities/carpool.entity';
import {Action} from './enums/action.enum';
import {UserRoleEnum} from '../user/entities/user-role.enum';
import {CASL_RESSOURCE_FORBIDDEN_ERROR_MESSAGE} from '../utils/constants';
import {OwnerType} from '../generics/owner.interface';
import {Submission} from '../submission/entities/submission.entity';

export type Subjects =
  | InferSubjects<typeof Carpool | typeof User | typeof Submission>
  | 'all';
export type AppAbility = Ability<[Action, Subjects]>;

/*
    T extends OwnerType means that we pass any class that have an owner in its fields. 
    Example: Carpool has an owner in its field so we could pass it
*/
@Injectable()
export class CaslAbilityFactory<T extends OwnerType> {
  createForUser(resource: T, user: User) {
    const {can, build} = new AbilityBuilder<Ability<[Action, Subjects]>>(
      Ability as AbilityClass<AppAbility>,
    );

    // if the user is admin
    if (user.roles.indexOf(UserRoleEnum.ADMIN) > -1) {
      can(Action.Manage, 'all'); // read-write access to everything
    } else {
      // if the user is not admin
      // if the resource is submission
      if (resource instanceof Submission) {
        // The user can read its submissions and the owner of the carpool can read its submissions.
        if (
          user.submissions?.indexOf(resource) > -1 ||
          resource.carpool.owner.id === user.id
        ) {
          can(Action.Read, Submission);
        }
      } else {
        // if the resource is smthng else
        // read-only access to everything
        can(Action.Manage, 'all');
      }
    }

    // if the actual user who's trying to access the resource is the owner of the resource we allow him to update and delete
    if (resource.owner.id === user.id) {
      can(Action.Update, Carpool);
      can(Action.Delete, Carpool);
    }
    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
