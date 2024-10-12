import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('user-profile')
@Controller('user-profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Get(':userId')
  @ApiOperation({ summary: 'Получение профиля пользователя' })
  @ApiResponse({ status: 200, description: 'Профиль пользователя' })
  getUserProfile(@Param('userId') userId: number) {
    return this.userProfileService.getUserProfile(userId);
  }

  @Post('add-to-watchlist')
  @ApiOperation({ summary: 'Добавление фильма в список "Посмотреть позже"' })
  @ApiResponse({ status: 201, description: 'Фильм добавлен в список' })
  addToWatchlist(
    @Body('userId') userId: number,
    @Body('movieId') movieId: number,
  ) {
    return this.userProfileService.addToWatchlist(userId, movieId);
  }

  @Post('add-to-collection')
  @ApiOperation({ summary: 'Добавление фильма в коллекцию пользователя' })
  @ApiResponse({ status: 201, description: 'Фильм добавлен в коллекцию' })
  addToCollection(
    @Body('userId') userId: number,
    @Body('movieId') movieId: number,
  ) {
    return this.userProfileService.addToMovieCollection(userId, movieId);
  }

  @Post('record-viewing')
  @ApiOperation({ summary: 'Сохранение прогресса просмотра фильма' })
  @ApiResponse({ status: 201, description: 'Прогресс просмотра сохранен' })
  recordViewing(
    @Body('userId') userId: number,
    @Body('movieId') movieId: number,
    @Body('time') time: number,
  ) {
    return this.userProfileService.recordViewing(userId, movieId, time);
  }
}
