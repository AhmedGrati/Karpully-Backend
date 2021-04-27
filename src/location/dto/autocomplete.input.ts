import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class AutocompleteInput {
    @Field(() => String)
    place: string;
    @Field({ defaultValue: 10 })
    limit: number;
}
