import { XYLocation } from './dto/xylocation.input';
import { HttpService, Injectable } from '@nestjs/common';
import { MultiPointsDirectionInput } from './dto/multipoints-direction.input';


@Injectable()
export class DirectionService {
  LOCIQ_URL_DIRECTIONS = "https://us1.locationiq.com/v1/directions/driving/"

  constructor(private httpService: HttpService) { }

  async multiPointsDirections(input: MultiPointsDirectionInput) {
    var data: any;
    let waypointString: string = ""; // longitude,latitude;redo
    input.points.forEach((point, index, arr) => {
      waypointString += point.lon + "," + point.lat + ";"
    })
    waypointString = waypointString.slice(0, -1);
    await this.httpService.get(this.LOCIQ_URL_DIRECTIONS + waypointString, {
      params: {
        key: process.env.LOCATIONIQ_TOKEN,
        geometries: "polyline",
        overview: "full",
        alternatives: false,

      }

    }).toPromise().then(e => {
      data = e.data;
    })
    return data;
  }
}
