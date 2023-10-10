import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { IListProductsOutput } from '../../../port/output/ilist_products_output';
import { WrapperListProduct } from '../wrapper/list-products-wrapper';

@Injectable()
export class ListProductsInfra implements IListProductsOutput {
  constructor(private readonly prisma: PrismaClient) {}
  async list() {
    const result = await this.prisma.product.findMany();
    if (!result) return [];
    const dtos = result.map((product) => WrapperListProduct.toDto(product));
    return dtos;
  }
}
