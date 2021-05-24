import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "../../user/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class ProfileImgUpload {
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Field()
    @Column()
    name: string;

    @OneToMany(() => User, (user) => user.profileImage)
    users: User[]
}
