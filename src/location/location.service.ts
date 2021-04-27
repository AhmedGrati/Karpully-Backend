import { AutocompleteInput } from './dto/autocomplete.input';
import { ReverseLocationSearchInput } from './dto/reverse-location-search-input';
import { FindLocationByTextInput } from './dto/find-location-by-text.input';
import { HttpService, Injectable } from '@nestjs/common';
import { CreateLocationInput } from './dto/create-location.input';

@Injectable()
export class LocationService {
  LOCIQ_URL_SEARCH = "https://us1.locationiq.com/v1/search.php";
  LOCIQ_URL_REVERSE = "https://us1.locationiq.com/v1/reverse.php"
  LOCIQ_URL_AUTOCOMP = "https://api.locationiq.com/v1/autocomplete.php"
  constructor(private httpService: HttpService) { }

  async findLocationByText(text: FindLocationByTextInput) {
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
  async reverseSearchLocation(xy: ReverseLocationSearchInput) {
    var data: any;
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
    return data;
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
