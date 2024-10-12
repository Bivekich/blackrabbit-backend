import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { CategoriesModule } from './categories/categories.module';
import { MoviesModule } from './movies/movies.module';
import { Watchlist } from './auth/watchlist.entity';
import { MovieCollection } from './auth/movie-collection.entity';
import { ViewingHistory } from './auth/viewing-history.entity';
import { Category } from './categories/category.entity';
import { Movie } from './movies/movie.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        User,
        Watchlist,
        MovieCollection,
        ViewingHistory,
        Category,
        Movie,
      ],
      synchronize: true,
    }),
    AuthModule,
    CategoriesModule,
    MoviesModule,
  ],
})
export class AppModule {}
