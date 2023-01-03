import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/movies')
      .expect(200)
      .expect('[]');
  });


  describe('/movies', () => { 
    it("GET)", () => { 
      return request(app.getHttpServer()) 
      .get("/movies")
      .expect(200) 
      .expect([]); 
    })
  }); 

  describe('/movies/:id', () => { 
    it.todo('GET'); 
    it.todo('DELETE'); 
    it.todo('PATCH'); 
  })
});
