import { Body, Controller, Post } from '@nestjs/common';
import { RegisterProductService } from './register-product.service';
import { ProductDto } from '../../../dto/product-dto';

@Controller()
export class RegisterProductController {
  constructor(private readonly service: RegisterProductService) {}
  @Post()
  async post(@Body() product: ProductDto) {
    await this.service.handle(product);
  }
}
