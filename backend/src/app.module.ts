import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ActivityDashboardModule } from './activity-dashboard/activity-dashboard.module';
import { AdminSettingsModule } from './admin-settings/admin-settings.module';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { HealthModule } from './health/health.module';
import { KratosModule } from './kratos/kratos.module';
import { OrganizersModule } from './organizers/organizers.module';
import { ParticipantsModule } from './participants/participants.module';
import { ParticipationsModule } from './participations/participations.module';
import { PrismaModule } from './prisma/prisma.module';
import { RatingsModule } from './ratings/ratings.module';
import { ReserveInspectorModule } from './reserve-inspector/reserve-inspector.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([
      {
        name: 'default',
        ttl: 60_000,
        limit: 200,
      },
    ]),
    PrismaModule,
    AuthModule,
    KratosModule,
    UsersModule,
    HealthModule,
    EventsModule,
    ParticipationsModule,
    RatingsModule,
    OrganizersModule,
    ParticipantsModule,
    ActivityDashboardModule,
    ReserveInspectorModule,
    AdminSettingsModule,
  ],
})
export class AppModule {}
