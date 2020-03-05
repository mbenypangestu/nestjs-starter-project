import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { Parent } from './parent.entity';
import { Crud } from '@nestjsx/crud';
import { ParentService } from './parent.service';

@Crud({
  model: {
    type: Parent,
  },
  routes: {
    only: ['getManyBase', 'getOneBase'],
  },
  query: {
    exclude: ['password'],
    join: {
      user: { eager: true, exclude: ['password'] },
    },
  },
})
@Controller('api/v1/parent')
@ApiTags('parent')
@ApiBearerAuth()
export class ParentController {
  constructor(
    private readonly service: ParentService,
    private readonly userService: UserService,
  ) {}

  @Get(':user_id')
  @ApiQuery({
    name: 'join',
    isArray: true,
    type: 'string',
    required: false,
  })
  async getParentByUserId(
    @Param('user_id') user_id: number,
    @Query('join') joins?: string[],
  ): Promise<Parent> {
    var relations: string[] = [];
    if (typeof joins === 'string') relations.push(joins);
    else relations = joins;

    const user = await this.userService.findById(user_id);
    const parent = await this.service.findOneByUser(user, relations);

    return parent;
  }
}
