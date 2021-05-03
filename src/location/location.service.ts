import { Address } from './entities/address.entity';
import { Carpool } from 'src/carpool/entities/carpool.entity';
import { AutocompleteInput } from './dto/autocomplete.input';
import { ReverseLocationSearchInput } from './dto/reverse-location-search-input';
import { FindLocationByTextInput } from './dto/find-location-by-text.input';
import { Dependencies, HttpService, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ADDRESS_SAVE_ISSUE_ERROR_MESSAGE, LOCATION_NOT_FOUND_ERROR_MESSAGE, LOCATION_SAVE_ISSUE_ERROR_MESSAGE } from '../utils/constants';
import { Location } from './entities/location.entity'
import { Exception } from 'handlebars';
import { AddressCreationInput } from './dto/address-creation.input';
import { LocationCreationInput } from './dto/location-creation.input';
@Injectable()
export class LocationService {
  LOCIQ_URL_SEARCH = "https://us1.locationiq.com/v1/search.php";
  LOCIQ_URL_REVERSE = "https://us1.locationiq.com/v1/reverse.php"
  LOCIQ_URL_AUTOCOMP = "https://api.locationiq.com/v1/autocomplete.php"
  constructor(
    @InjectRepository(Location) private readonly locationRepository: Repository<Location>,
    @InjectRepository(Address) private readonly addressRepository: Repository<Address>,
    private httpService: HttpService) {
  }

  async create(loc: Location | LocationCreationInput): Promise<Location | void> {
    return this.locationRepository.save(loc).then(e => {
      if (!e) {
        throw new Exception(LOCATION_SAVE_ISSUE_ERROR_MESSAGE)
      }
    })
  }
  async createAddress(ad: AddressCreationInput): Promise<Address | void> {
    return await this.addressRepository.save(ad).then(e => {
      if (!e) {
        throw new Exception(ADDRESS_SAVE_ISSUE_ERROR_MESSAGE)
      }
    })
  }
  async findAllAddress(): Promise<Address[]> {
    return await this.addressRepository.find();
  }
  async findAll(): Promise<Location[]> {
    return await this.locationRepository.find();
  }

  async findOne(id: number): Promise<Location> {
    const location = await this.locationRepository.findOne({ where: { place_id: id } });
    if (location) {
      return location;
    }
    throw new NotFoundException(LOCATION_NOT_FOUND_ERROR_MESSAGE);
  }

  async findLocationByText(text: FindLocationByTextInput): Promise<Location[]> {
    var data: any;
    await this.httpService.get(this.LOCIQ_URL_SEARCH, {
      params: {
        key: process.env.LOCATIONIQ_TOKEN,
        q: text.text,
        format: "json"
      }
    }).toPromise().then(e => {
      data = e.data;
    })
    return data;
  }
  async reverseSearchLocation(xy: ReverseLocationSearchInput): Promise<Location[]> {
    var data: Location[];

    await this.httpService.get(this.LOCIQ_URL_REVERSE, {
      params: {
        lon: xy.lon,
        lat: xy.lat,
        key: process.env.LOCATIONIQ_TOKEN,
        format: 'json'
      }
    }).toPromise().then(e => {
      data = [e.data]
    })
    const preExistingLoc = await this.locationRepository.findOne({ where: { lon: data[0].lon, lat: data[0].lat } });

    if (!preExistingLoc) {
      const dataToStore = this.locationRepository.create(data)
      this.locationRepository.merge(dataToStore[0])
      await this.locationRepository.save(dataToStore).then(e => {
        data = e;
      })
      return data;
    }

    else {
      await this.locationRepository.save({
        id: preExistingLoc.id,
        visited: preExistingLoc.visited + 1
      })
      return [preExistingLoc];
    }
  }
  async autocomplete(input: AutocompleteInput) {
    var data: any;
    await this.httpService.get(this.LOCIQ_URL_AUTOCOMP, {
      params: {
        key: process.env.LOCATIONIQ_TOKEN,
        format: "json",
        q: input.place,
        countrycodes: "tn",
        limit: input.limit
      }
    }).toPromise().then(e => {
      data = e.data;

    })
    return data;
  }

}
