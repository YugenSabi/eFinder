import { Module } from '@nestjs/common';
import {AuthModule} from '../auth/auth.module';
import {UsersModule} from '../users/users.module';
import { OrganizersService } from './organizers.service';
import { OrganizersController } from './organizers.controller';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [OrganizersController],
  providers: [OrganizersService],
})
export class OrganizersModule {}
