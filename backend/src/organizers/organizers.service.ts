import {ForbiddenException, Injectable} from '@nestjs/common';
import {
  OrganizerProfileStatus,
  type User,
  UserRole,
} from '@prisma/client';
import { RequestOrganizerAccessDto } from './dto/request-organizer-access.dto';
import {UsersService} from '../users/users.service';
import { UpdateOrganizerDto } from './dto/update-organizer.dto';
import { UpdateOrganizerProfileDto } from './dto/update-organizer-profile.dto';

@Injectable()
export class OrganizersService {
  constructor(private readonly usersService: UsersService) {}

  requestAccess(
    currentUser: User,
    requestOrganizerAccessDto: RequestOrganizerAccessDto,
  ) {
    return this.usersService.requestOrganizerAccess(
      currentUser.id,
      requestOrganizerAccessDto,
    );
  }

  findAll(currentUser: User) {
    this.assertCanModerate(currentUser);

    return this.usersService.listOrganizerCandidates();
  }

  findApproved(currentUser: User) {
    this.assertCanModerate(currentUser);

    return this.usersService.listApprovedOrganizers();
  }

  findPublicProfile(userId: string) {
    return this.usersService.getProfileView(userId);
  }

  updateOwnProfile(currentUser: User, updateOrganizerProfileDto: UpdateOrganizerProfileDto) {
    return this.usersService.updateOrganizerProfile(
      currentUser.id,
      updateOrganizerProfileDto,
    );
  }

  update(currentUser: User, userId: string, updateOrganizerDto: UpdateOrganizerDto) {
    this.assertCanModerate(currentUser);

    if (updateOrganizerDto.status === OrganizerProfileStatus.APPROVED) {
      return this.usersService.approveOrganizerRequest(userId);
    }

    return this.usersService.rejectOrganizerRequest(userId);
  }

  private assertCanModerate(currentUser: User) {
    if (currentUser.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Only admin can moderate organizers');
    }
  }
}
