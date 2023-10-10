import { Inject, Injectable } from '@nestjs/common';
import { IListProducts } from '../../../port/input/ilist-products';

@Injectable()
export class ListProductsService {
  constructor(
    @Inject('input')
    private readonly input: IListProducts,
  ) {}
  async handle() {
    return await this.input.execute();
  }
}
