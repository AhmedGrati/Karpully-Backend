import {ObjectType, Field, Int} from '@nestjs/graphql';
import {ConnectionHistoric} from '../../connection-historic/entities/connection-historic.entity';
import {TimestampEntites} from '../../generics/timestamp.entity';
import {Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';

@ObjectType()
@Entity()
export class Connection extends TimestampEntites {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => ConnectionHistoric,
    (connectionHistoric) => connectionHistoric.connections,
  )
  @Field(() => ConnectionHistoric)
  historic: ConnectionHistoric;
}
