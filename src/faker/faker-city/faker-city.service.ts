import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { CreateCityInput } from 'src/city/dto/create-city.input';
import { CityService } from '../../city/city.service';
const cityData = require('../../../data/cities.json');
@Injectable()
export class FakerCityService implements OnApplicationBootstrap{
    constructor(private readonly cityService: CityService) {}
    async onApplicationBootstrap() {
        const allCities = await this.cityService.findAll();
        const ALL_CITIES_COUNT = 264;
        if(allCities.length < ALL_CITIES_COUNT) {
            const citiesArray = cityData.data.municipalities;
            citiesArray.forEach(async (city) => {
                const cityName: string = city.name;
                const govId: number = city.gov_code;
                const createGovInput : CreateCityInput = {cityName, govId};
                await this.cityService.create(createGovInput);
            });
        }
    }

}
