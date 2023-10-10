import { Controller, HttpStatus } from '@nestjs/common';
import { Response } from '../../../dto/response-dto';
import { ProductDto } from '../../../dto/product-dto';
import { ListProductsService } from './list-products.service';

@Controller('list-products')
export class ListProductsController {
  constructor(private readonly service: ListProductsService) {}

  async get(): Promise<Response<ProductDto[]>> {
    try {
      const result = await this.service.handle();
      if (!result?.length) {
        return {
          status: HttpStatus.NOT_FOUND,
          error: 'Produto não encontrado',
        };
      }
      return {
        status: HttpStatus.OK,
        data: result,
      };
    } catch (error: any) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message,
      };
    }
  }
}
