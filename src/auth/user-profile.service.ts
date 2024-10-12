import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Watchlist } from './watchlist.entity';
import { MovieCollection } from './movie-collection.entity';
import { ViewingHistory } from './viewing-history.entity';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Watchlist)
    private readonly watchlistRepository: Repository<Watchlist>,
    @InjectRepository(MovieCollection)
    private readonly movieCollectionRepository: Repository<MovieCollection>,
    @InjectRepository(ViewingHistory)
    private readonly viewingHistoryRepository: Repository<ViewingHistory>,
  ) {}

  async getUserProfile(userId: number) {
    return await this.userRepository.findOne({
      where: { id: userId },
      relations: ['watchlist', 'movieCollection', 'viewingHistory'],
    });
  }

  async addToWatchlist(userId: number, movieId: number) {
    const watchlistEntry = this.watchlistRepository.create({
      user: { id: userId },
      movie: { id: movieId },
    });
    return await this.watchlistRepository.save(watchlistEntry);
  }

  async addToMovieCollection(userId: number, movieId: number) {
    const collectionEntry = this.movieCollectionRepository.create({
      user: { id: userId },
      movie: { id: movieId },
    });
    return await this.movieCollectionRepository.save(collectionEntry);
  }

  async recordViewing(userId: number, movieId: number, time: number) {
    let historyEntry = await this.viewingHistoryRepository.findOne({
      where: { user: { id: userId }, movie: { id: movieId } },
    });

    if (historyEntry) {
      historyEntry.lastWatchedTime = time;
    } else {
      historyEntry = this.viewingHistoryRepository.create({
        user: { id: userId },
        movie: { id: movieId },
        lastWatchedTime: time,
      });
    }

    return await this.viewingHistoryRepository.save(historyEntry);
  }
}
