import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { IListProductsOutput } from '../../port/output/ilist_products_output';

@Injectable()
export class ListProductsInfra implements IListProductsOutput {
  constructor(private readonly prisma: PrismaClient) {}
  async list() {
    return await this.prisma.product.findMany();
  }
}
