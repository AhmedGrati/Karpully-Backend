import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from './entities/user.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  providers: [UserResolver, UserService],
  imports:[
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/user/user.graphql'),
    }),
    TypeOrmModule.forFeature([User])
  ]
})
export class UserModule {

}
