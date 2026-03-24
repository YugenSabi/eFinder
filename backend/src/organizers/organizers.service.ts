import {ForbiddenException, Injectable} from '@nestjs/common';
import {type User, UserRole} from '@prisma/client';
import {UsersService} from '../users/users.service';
import { UpdateOrganizerDto } from './dto/update-organizer.dto';

@Injectable()
export class OrganizersService {
  constructor(private readonly usersService: UsersService) {}

  findAll(currentUser: User) {
    this.assertCanModerate(currentUser);

    return this.usersService.listOrganizerCandidates();
  }

  findApproved(currentUser: User) {
    this.assertCanModerate(currentUser);

    return this.usersService.listApprovedOrganizers();
  }

  update(currentUser: User, userId: string, updateOrganizerDto: UpdateOrganizerDto) {
    this.assertCanModerate(currentUser);

    return this.usersService.updateUserRole(userId, updateOrganizerDto.role);
  }

  private assertCanModerate(currentUser: User) {
    if (currentUser.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Only admin can moderate organizers');
    }
  }
}
