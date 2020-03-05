import { Controller } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Crud } from '@nestjsx/crud';

@Crud({
  model: {
    type: User,
  },
  routes: {
    only: [
      'getOneBase',
      'getManyBase',
      'updateOneBase',
      'replaceOneBase',
      'deleteOneBase',
    ],
  },
  query: {
    exclude: ['password'],
    join: {
      role: {},
      city: {},
    },
  },
})
@Controller('api/v1/user')
@ApiTags('user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly service: UserService) {}
}
