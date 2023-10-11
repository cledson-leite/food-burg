import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DatabaseModule } from '../src/database/database.module';
import { PrismaClient } from '@prisma/client';
import { product1, product2 } from './products';

describe('Get Method Integration Test', () => {
  const prismaService = new PrismaClient();
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });
  beforeEach(async () => {
    await prismaService.product.deleteMany({
      where: {
        id: {
          gte: 0,
        },
      },
    });
  });
  afterEach(async () => {
    await prismaService.product.deleteMany({
      where: {
        id: {
          gte: 0,
        },
      },
    });
  });
  it('Should return error 404 in case of empty db', async () => {
    const result = await request(await app.getHttpServer()).get('/');
    expect(result.statusCode).toBe(404);
    expect(result.body.message).toBe('Produto não encontrado');
  });
  it('Should return a list of products', async () => {
    await prismaService.product.create({ data: product1 });
    await prismaService.product.create({ data: product2 });
    const result = await request(await app.getHttpServer()).get('/');
    expect(result.statusCode).toBe(200);
    expect(result.body.length).toBe(2);
    expect(result.body[0].name).toBe(product1.name);
    expect(result.body[1].name).toBe(product2.name);
  });
});
