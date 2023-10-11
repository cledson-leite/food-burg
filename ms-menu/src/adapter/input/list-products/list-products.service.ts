import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IListProducts } from '../../../port/input/ilist-products';

@Injectable()
export class ListProductsService {
  constructor(
    @Inject('input')
    private readonly input: IListProducts,
  ) {}
  async handle() {
    const result = await this.input.execute();
    if (!result?.length) throw new NotFoundException('Produto não encontrado');
    return result;
  }
}
