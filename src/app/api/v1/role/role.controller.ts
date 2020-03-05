import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { Crud } from '@nestjsx/crud';
import { Role } from './role.entity';
import { AuthGuard } from '@nestjs/passport';

@Crud({
  model: {
    type: Role,
  },
  routes: {
    only: ['getManyBase', 'getOneBase', 'createOneBase', 'deleteOneBase'],
    createOneBase: {
      decorators: [UseGuards(AuthGuard('jwt'))],
    },
    deleteOneBase: {
      decorators: [UseGuards(AuthGuard('jwt'))],
    },
  },
})
@Controller('api/v1/role')
@ApiTags('role')
@ApiBearerAuth()
export class RoleController {
  constructor(private readonly service: RoleService) {}
}
