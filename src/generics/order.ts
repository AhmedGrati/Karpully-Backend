// import { Field, InputType, ObjectType, PartialType, Scalar } from "@nestjs/graphql";
// import { Carpool } from "../carpool/entities/carpool.entity";
// import { ClassType } from "type-graphql";
// import { CreateCarpoolInput } from "../carpool/dto/create-carpool.input";


// type KeysMatching<T,V> = NonNullable<
//   { [K in keyof T]: T[K] extends V ? K : never }[keyof T]
// >;
// export default function WhereInput<T>(TClass: ClassType<T>): any {

//     @InputType({isAbstract: true})
//     abstract class Where {
//         @Field(type => PartialType(CreateCarpoolInput))
//         fields: Partial<T>;
//     }

//     return Where;

// }