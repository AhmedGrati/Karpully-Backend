import {Resolver, Query, Mutation, Args, Int} from '@nestjs/graphql';
import {ConnectionHistoricService} from './connection-historic.service';
import {ConnectionHistoric} from './entities/connection-historic.entity';

@Resolver(() => ConnectionHistoric)
export class ConnectionHistoricResolver {
  constructor(
    private readonly connectionHistoricService: ConnectionHistoricService,
  ) {}

  @Query(() => ConnectionHistoric)
  connectionHistoric(@Args('userId') userId: number) {
    return this.connectionHistoricService.findOneByUserId(userId);
  }

  // @Mutation(() => ConnectionHistoric)
  // createConnectionHistoric(@Args('createConnectionHistoricInput') createConnectionHistoricInput: CreateConnectionHistoricInput) {
  //   return this.connectionHistoricService.create(createConnectionHistoricInput);
  // }

  // @Query(() => [ConnectionHistoric], { name: 'connectionHistoric' })
  // findAll() {
  //   return this.connectionHistoricService.findAll();
  // }

  // @Query(() => ConnectionHistoric, { name: 'connectionHistoric' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.connectionHistoricService.findOne(id);
  // }

  // @Mutation(() => ConnectionHistoric)
  // updateConnectionHistoric(@Args('updateConnectionHistoricInput') updateConnectionHistoricInput: UpdateConnectionHistoricInput) {
  //   return this.connectionHistoricService.update(updateConnectionHistoricInput.id, updateConnectionHistoricInput);
  // }

  // @Mutation(() => ConnectionHistoric)
  // removeConnectionHistoric(@Args('id', { type: () => Int }) id: number) {
  //   return this.connectionHistoricService.remove(id);
  // }
}
