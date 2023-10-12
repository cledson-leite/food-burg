import { Module } from '@nestjs/common';
import { ListProducts } from '../../../core/use-case/list-products/list_products';
import { ListProductsService } from './list-products.service';
import { ListProductsController } from './list-products.controller';
import { PrismaClient } from '@prisma/client';
import { DatabaseService } from '../../../database/database.service';
import { IListProducts } from '../../../port/input/ilist-products';
import { IListService } from '../../../port/output/ilist_service';
import { ListProductsInfra } from '../../output/list-product/list-product-infra';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 600,
      isGlobal: true,
    }),
  ],
  controllers: [ListProductsController],
  providers: [
    ListProductsService,
    {
      provide: ListProductsService,
      useFactory: (input: IListProducts, cache: any) =>
        new ListProductsService(input, cache),
      inject: ['input', CACHE_MANAGER],
    },
    {
      provide: 'input',
      useFactory: (output: IListService) => new ListProducts(output),
      inject: ['output'],
    },
    {
      provide: 'output',
      useFactory: (prisma: PrismaClient) => new ListProductsInfra(prisma),
      inject: ['database'],
    },
    {
      provide: 'database',
      useClass: DatabaseService,
    },
  ],
  exports: [ListProductsService],
})
export class ListProductsModule {}
