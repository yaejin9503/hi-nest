import { PartialType } from '@nestjs/mapped-types'
import { CreateMovieDto } from './create-movie-dto';

// 생성시 제약 규칙? 같은 건가

export class UpdateMovieDto extends PartialType( CreateMovieDto ){ }

