import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { CreateGovInput } from 'src/gov/dto/create-gov.input';
import { Gov } from 'src/gov/entities/gov.entity';
import { GovService } from '../../gov/gov.service';
const govData = require('../../../data/govs.json');
@Injectable()
export class FakerGovService{
    
    constructor(private readonly govService:GovService){}
    async seed() {
        const allGovInDB = await this.govService.findAll();
        const TUNISIAN_GOVS_COUNT = 24;

        if(allGovInDB.length < TUNISIAN_GOVS_COUNT) {
            const govsArray = govData.data.states;
            govsArray.forEach(async (gov) => {
                const govName: string = gov.name;
                const createGovInput : CreateGovInput = {govName};
                await this.govService.create(createGovInput);
            });
        }
    }
}
