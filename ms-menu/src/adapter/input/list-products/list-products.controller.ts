import { Controller, Get } from '@nestjs/common';
import { ProductDto } from '../../../dto/product-dto';
import { ListProductsService } from './list-products.service';
@Controller()
export class ListProductsController {
  constructor(private readonly service: ListProductsService) {}

  @Get()
  async get(): Promise<ProductDto[]> {
    return await this.service.handle();
  }
}
