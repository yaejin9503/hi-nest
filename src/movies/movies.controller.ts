import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll(): string {
    return 'This will return al  movies';
  }

  @Get('search')
  search(@Query('year') searchingYear: string): string {
    return `we are searching for a movie with a title ${searchingYear}`;
  }

  @Get('/:id')
  getOne(@Param('id') id: string): string {
    return `This will return one ${id}`;
  }

  @Post()
  create(@Body() movieData): string {
    console.log(movieData);
    return 'This will create a movie';
  }

  // @Delete('/:id')
  // remove(@Param('id') movieId: string): string {
  //   return `This will delete a movie ${movieId}`;
  // }

  @Patch(':id')
  patch(@Param('id') movieId: string, @Body() updateData) {
    return {
      updateMovie: movieId,
      ...updateData,
    };
  }

  
}
