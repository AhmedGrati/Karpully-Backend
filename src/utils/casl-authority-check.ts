/* 
    This is a higher order function which takes a repository of an entity, the entity id
    the owner and will check the casl authority
*/

import { Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Type } from "class-transformer";
import { Action } from "../casl/enums/action.enum";
import { User } from "../user/entities/user.entity";
import { Repository } from "typeorm";
import { CASL_RESSOURCE_FORBIDDEN_ERROR_MESSAGE } from "./constants";
import { CaslAbilityFactory, Subjects } from "../casl/casl-ability.factory";
import { OwnerType } from "../generics/owner.interface";
import { PartialType } from "@nestjs/graphql";
import { Subject } from "@casl/ability";

export async function checkCASLAndExecute<T extends OwnerType>(
    user: User, 
    caslAbilityFactory: CaslAbilityFactory<T>,
    action: Action, 
    entityId: number, // entity id
    entityRepository: Repository<T>, 
    func: () => Promise<T>): Promise<T> {
    const entity = await entityRepository.findOne({where: {id: entityId}});
    if(!entity) {
      throw new NotFoundException();
    }else{
      const ability = caslAbilityFactory.createForUser(entity, user);
      if(ability.can(action, entity as unknown as Subjects)) {
        return func();
      } else {
        throw new UnauthorizedException(CASL_RESSOURCE_FORBIDDEN_ERROR_MESSAGE);
      }
    }
  }