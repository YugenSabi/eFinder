import { Injectable } from '@nestjs/common';
import type { Request } from 'express';
import { KratosService } from '../kratos/kratos.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly kratosService: KratosService,
    private readonly usersService: UsersService,
  ) {}

  async getAuthenticatedUser(request: Request) {
    const session = await this.kratosService.getSession(request);

    return this.usersService.syncFromKratosIdentity(session.identity);
  }

  async getMe(request: Request) {
    const session = await this.kratosService.getSession(request);
    const user = await this.usersService.syncFromKratosIdentity(
      session.identity,
    );

    return {
      id: user.id,
      kratosIdentityId: user.kratosIdentityId,
      email: user.email,
      isVerified: user.isVerified,
      firstName: user.firstName,
      lastName: user.lastName,
      city: user.city,
      age: user.age,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      session: {
        id: session.id,
        active: session.active,
      },
    };
  }
}
