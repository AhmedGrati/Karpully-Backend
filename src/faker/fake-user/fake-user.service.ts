import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { EnvironmentVariables } from '../../common/EnvironmentVariables';
import { Repository } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { UserRoleEnum } from '../../user/entities/user-role.enum';
import { Gender } from '../../user/entities/gender';
const faker = require('faker'); 
@Injectable()
export class FakeUserService{
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly configService: ConfigService<EnvironmentVariables>
    ) {}
    async seed() {
        const seedNumber = this.configService.get<number>('SEED_NUMBER');
        const currentUsers: User[] = await this.userRepository.find();
        if(currentUsers.length < seedNumber) {
            return await Array.from({length: seedNumber}).map<Promise<User>>(async () => {
                const fakerUser: Partial<User> = {
                    username: faker.name.findName() as string,
                    firstname: faker.name.firstName() as string,
                    lastname: faker.name.lastName() as string,
                    age: faker.datatype.number({
                        'min':5,
                        'max':100
                    }) as number,
                    rate: faker.datatype.number({
                        'min':0,
                        'max':5
                    }) as number,
                    email: faker.internet.email() as string,
                    localization: "Tunis",
                    telNumber: faker.phone.phoneNumber("+216 ########") as string,
                    password:faker.internet.password() as string,
                    roles: faker.random.arrayElements([UserRoleEnum.ADMIN, UserRoleEnum.USER]) as UserRoleEnum[],
                    gender: faker.random.arrayElement([Gender.FEMALE, Gender.FEMALE]) as Gender,
                    isConfirmed: true,
                };
                const user = await this.userRepository.create(fakerUser);
                const savedUser = await this.userRepository.save(user);
                return savedUser;
            }) 
        }
        
    }
}
