import { Address } from './../entities/address.entity';
import { InputType, Int, Field, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class AddressCreationInput extends PartialType(OmitType(Address, ['ID'])) {
    @Field()
    createdAt?: number;
}