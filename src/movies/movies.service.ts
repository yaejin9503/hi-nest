import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie-dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id : string): Movie{ 
    const movie = this.movies.find(movie => movie.id === parseInt(id)); 
    if(!movie) { 
      throw new NotFoundException("Movie with Id: " + id); 
    }
    return movie 
  }

  deleteOne(id:string): boolean{ 
    this.getOne(id); 
    this.movies = this.movies.filter(movie => movie.id !== +id);
    return true; 
  }

  createMovie(movieData: CreateMovieDto) { 
    this.movies.push({ 
      id: this.movies.length + 1, 
      ...movieData,
    })
  }


  update(id: string, updateData){ 
    const movie = this.getOne(id); 
    this.deleteOne(id); 
    this.movies.push({ ...movie, ...updateData })
    
  }
}
