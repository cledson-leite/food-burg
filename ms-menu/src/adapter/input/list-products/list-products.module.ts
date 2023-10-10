import { Module } from '@nestjs/common';
import { ListProducts } from '../../../core/use-case/list-pproducts/list_products';
import { ListProductsService } from './list-products.service';

@Module({
  providers: [
    ListProductsService,
    {
      provide: 'input',
      useValue: ListProducts,
    },
  ],
  exports: [ListProductsService],
})
export class ListProductsModule {}
