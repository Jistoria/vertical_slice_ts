import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('tasks (POST)', async () => {
    const task = {
      title: 'Task 1',
      description: 'Description Task 1',
    };
    const response = await request(app.getHttpServer())
      .post('/tasks')
      .send(task);
    expect(response.status).toBe(201);
  });

  it('tasks (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/tasks');
    expect(response.status).toBe(200);
  });
});
