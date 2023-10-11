import { Module } from '@nestjs/common';
import { ListProducts } from '../../../core/use-case/list-products/list_products';
import { ListProductsService } from './list-products.service';
import { ListProductsController } from './list-products.controller';
import { PrismaClient } from '@prisma/client';
import { DatabaseService } from '../../../database/database.service';
import { IListProducts } from '../../../port/input/ilist-products';
import { IListProductsOutput } from '../../../port/output/ilist_products_output';
import { ListProductsInfra } from '../../output/list-product/list-product-infra';

@Module({
  controllers: [ListProductsController],
  providers: [
    ListProductsService,
    {
      provide: ListProductsService,
      useFactory: (input: IListProducts) => new ListProductsService(input),
      inject: ['input'],
    },
    {
      provide: 'input',
      useFactory: (output: IListProductsOutput) => new ListProducts(output),
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
