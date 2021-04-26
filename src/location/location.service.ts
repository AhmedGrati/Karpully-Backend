import { FindLocationByTextInput } from './dto/find-location-by-text.input';
import { HttpService, Injectable } from '@nestjs/common';
import { CreateLocationInput } from './dto/create-location.input';
import { Any } from 'typeorm';

@Injectable()
export class LocationService {
  LOCIQ_URL = "https://us1.locationiq.com/v1/search.php";

  constructor(private httpService: HttpService) { }

  create(createLocationInput: CreateLocationInput) {
    return 'This action adds a new location';
  }
  async findLocationByText(text: FindLocationByTextInput) {
    var data: any;
    await this.httpService.get(this.LOCIQ_URL, {
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
}
