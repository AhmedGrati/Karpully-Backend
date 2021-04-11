import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GOV_NOT_FOUND_ERROR_MESSAGE } from '../utils/constants';
import { Repository } from 'typeorm';
import { CreateGovInput } from './dto/create-gov.input';
import { UpdateGovInput } from './dto/update-gov.input';
import { Gov } from './entities/gov.entity';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';

@Injectable()
export class GovService {
  constructor( @InjectRepository(Gov) private readonly govRepository: Repository<Gov>,

  ){}
  async create(createGovInput: CreateGovInput): Promise<Gov> {
    const gov = await this.govRepository.create(createGovInput);
    await this.govRepository.save(gov);
    return gov;
  }

  async findAll():Promise<Gov[]> {
    return await this.govRepository.find();
  }

  async findOne(id: number): Promise<Gov> {
    const gov: Gov = await this.govRepository.findOne({where:{id}});
    if(gov) {
      return gov;
    }else{
      throw new NotFoundException(GOV_NOT_FOUND_ERROR_MESSAGE);
    }
  }

  async update(id: number, updateGovInput: UpdateGovInput): Promise<Gov> {
    let gov = await this.govRepository.findOne({where:{id}});
    if(!gov) {
      throw new NotFoundException(GOV_NOT_FOUND_ERROR_MESSAGE);
    }else{
      gov  = await this.govRepository.save(updateGovInput);
      return gov;
    }
  }

  async remove(id: number): Promise<Gov> {
    const govToRemove = await this.govRepository.findOne({where:{id}});
    await this.govRepository.delete(id);
    return govToRemove;
  }
}
