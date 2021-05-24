import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {ChatService} from '../chat/chat.service';
import {UserService} from '../user/user.service';
import {Message} from './entities/message.entity';
import {MessageService} from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        {
          provide: getRepositoryToken(Message),
          useValue: {},
        },
        {
          provide: 'PUB_SUB',
          useValue: {},
        },
        ChatService,
        UserService,
      ],
    })
      .overrideProvider(ChatService)
      .useValue({})
      .overrideProvider(UserService)
      .useValue({})
      .compile();

    service = module.get<MessageService>(MessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
