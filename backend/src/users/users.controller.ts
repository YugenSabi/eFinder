import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Req,
} from '@nestjs/common';
import { UserRole, type User } from '@prisma/client';
import type { Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async findAll(@Req() request: Request) {
    const currentUser = await this.authService.getAuthenticatedUser(request);
    this.assertAdmin(currentUser);

    return this.usersService.listAll();
  }

  @Patch(':id/role')
  async updateRole(
    @Req() request: Request,
    @Param('id') userId: string,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    const currentUser = await this.authService.getAuthenticatedUser(request);
    this.assertAdmin(currentUser);

    return this.usersService.updateUserRole(userId, updateUserRoleDto.role);
  }

  private assertAdmin(currentUser: User) {
    if (currentUser.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Only admin can manage roles');
    }
  }
}
