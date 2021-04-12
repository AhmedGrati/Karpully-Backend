import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarpoolService } from '../../carpool/carpool.service';
import { UserService } from '../../user/user.service';

@Injectable()
export class FakerCarpoolService implements OnApplicationBootstrap {
    constructor(private readonly carpoolService: CarpoolService,
        private readonly userService: UserService
        ){}
    onApplicationBootstrap() {
        
    }
    
}
