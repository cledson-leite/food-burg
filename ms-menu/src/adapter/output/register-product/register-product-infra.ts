import { PrismaClient } from '@prisma/client';
import { ProductDto } from '../../../dto/product-dto';

export class RegisterProductInfra {
  constructor(private readonly prisma: PrismaClient) {}

  async register(product: ProductDto) {
    await this.prisma.product.create({ data: product });
  }
}
