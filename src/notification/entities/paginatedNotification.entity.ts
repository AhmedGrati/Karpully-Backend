
import { Meta } from "../../generics/meta"
import { Field, ObjectType } from "@nestjs/graphql";
import { Notification } from "./notification.entity"

@ObjectType()
export class PaginatedNotification{

    @Field(() => [Notification])
    items: Notification[]

    @Field()
    meta: Meta

}