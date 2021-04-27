import { Injectable } from '@nestjs/common';
import { MultiPointsDirectionInput } from './dto/multipoints-direction.input';


@Injectable()
export class DirectionService {
  LOCIQ_URL_DIRECTIONS = "https://us1.locationiq.com/v1/directions/driving/"

  async multiPointsDirections(input: MultiPointsDirectionInput) {
    return;
  }
}
