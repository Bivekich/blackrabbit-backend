import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { MailerService } from './mailer.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Watchlist } from './watchlist.entity';
import { MovieCollection } from './movie-collection.entity';
import { ViewingHistory } from './viewing-history.entity';
import { UserProfileService } from './user-profile.service';
import { UserProfileController } from './user-profile.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Watchlist,
      MovieCollection,
      ViewingHistory,
    ]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get<string>('JWT_EXPIRATION_TIME')}s`,
        },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, MailerService, UserProfileService],
  controllers: [AuthController, UserProfileController],
})
export class AuthModule {}
