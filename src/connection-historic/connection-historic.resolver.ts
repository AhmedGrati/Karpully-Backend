import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ConnectionHistoricService } from './connection-historic.service';
import { ConnectionHistoric } from './entities/connection-historic.entity';
import { CreateConnectionHistoricInput } from './dto/create-connection-historic.input';
import { UpdateConnectionHistoricInput } from './dto/update-connection-historic.input';

@Resolver(() => ConnectionHistoric)
export class ConnectionHistoricResolver {
  constructor(private readonly connectionHistoricService: ConnectionHistoricService) {}

  @Mutation(() => ConnectionHistoric)
  createConnectionHistoric(@Args('createConnectionHistoricInput') createConnectionHistoricInput: CreateConnectionHistoricInput) {
    return this.connectionHistoricService.create(createConnectionHistoricInput);
  }

  @Query(() => [ConnectionHistoric], { name: 'connectionHistoric' })
  findAll() {
    return this.connectionHistoricService.findAll();
  }

  @Query(() => ConnectionHistoric, { name: 'connectionHistoric' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.connectionHistoricService.findOne(id);
  }

  @Mutation(() => ConnectionHistoric)
  updateConnectionHistoric(@Args('updateConnectionHistoricInput') updateConnectionHistoricInput: UpdateConnectionHistoricInput) {
    return this.connectionHistoricService.update(updateConnectionHistoricInput.id, updateConnectionHistoricInput);
  }

  @Mutation(() => ConnectionHistoric)
  removeConnectionHistoric(@Args('id', { type: () => Int }) id: number) {
    return this.connectionHistoricService.remove(id);
  }
}
