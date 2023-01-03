import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Server } from 'http';
import { NotFoundError } from 'rxjs';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  // afterAll(() => { 

  // })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll", () => { 
    it("should return an array", () => { 
      const result = service.getAll(); 
      expect(result).toBeInstanceOf(Array); 
    });
  }); 

  describe("getOne", () => { 
    it('should return a movie', () => { 
      service.createMovie({
        title: 'Test Movie',
        year: 2000,
        genres: ['test'],
      });

      const movie = service.getOne(1); 
      expect(movie).toBeDefined(); 
      expect(movie.id).toEqual(1); 
    })

    it("should throw 404 error" , () => { 
      try { 
        service.getOne(999); 
      }catch(e){ 
        expect(e).toBeInstanceOf(NotFoundException); 
        expect(e.message).toEqual("Movie with Id: 999")
      }
    })
  });

  describe("deleteOne", () => { 
    it("delete a movie", () => { 
      service.createMovie({
        title: 'Test Movie',
        year: 2000,
        genres: ['test'],
      });
      const beforeDelete = service.getAll().length; 
      service.deleteOne(1); 
      const afterDelete = service.getAll().length; 
      
      expect(afterDelete).toEqual(beforeDelete -1);
    })

    it("should return a 404", () => { 
      try{ 
        service.deleteOne(999);
      }catch(e){ 
        expect(e).toBeInstanceOf(NotFoundException); 
        expect(e.message).toEqual("Movie with Id: 999");
      }
    })
  }); 


  describe("create", () => { 
    it("should create a movie", () => { 
      const beforeCreate = service.getAll().length;
      service.createMovie({
        title: 'Test Movie',
        year: 2000,
        genres: ['test'],
      });
      const afterCreate = service.getAll().length; 
      console.log(beforeCreate, afterCreate); 
      expect(afterCreate).toBeGreaterThan(beforeCreate); 
    
    })
  })

  describe("update", () => { 
    it("should update a movie", () => { 
      service.createMovie({
        title: 'Test Movie',
        year: 2000,
        genres: ['test'],
      });
      service.update(1, { title: "Updated Test"})
      const movie = service.getOne(1); 
      expect(movie.title).toEqual('Updated Test'); 
    })

    it("should throw a NotFoundException", () => { 
      try{ 
        service.update(999, {});
      }catch(e){ 
        expect(e).toBeInstanceOf(NotFoundException); 
        expect(e.message).toEqual("Movie with Id: 999");
      }
    })
  })
});
