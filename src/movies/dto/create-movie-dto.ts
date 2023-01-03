import { IsString, IsNumber, IsOptional } from 'class-validator'; 
// 생성시 제약 규칙? 같은 건가

export class CreateMovieDto{ 
    @IsString()
    readonly title: string; 
    @IsNumber()
    readonly year: number; 

    @IsOptional()
    @IsString({ each: true })
    readonly genres: string[];
}