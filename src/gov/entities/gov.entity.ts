import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Gov {
  @Field(type => Int, {nullable: true})
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  @Field()
  govName: string;

}
