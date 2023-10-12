import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IListProducts } from '../../../port/input/ilist-products';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ListProductsService {
  constructor(
    @Inject('input')
    private readonly input: IListProducts,
    @Inject(CACHE_MANAGER)
    private readonly cache: Cache,
  ) {}
  async handle() {
    const resultCached = await this.cache.get('products');
    if (resultCached) {
      const result = JSON.parse(resultCached as string);
      return result;
    }
    const result = await this.input.execute();
    if (!result?.length) throw new NotFoundException('Produto não encontrado');
    await this.cache.set('products', JSON.stringify(result));
    return result;
  }
}
