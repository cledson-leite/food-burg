import { Product } from '../../entity/product';
import { IListProductsOutput } from '../../../port/output/ilist_products_output';
import { productFake } from './product-faker';

export class ListProductsOutputStub implements IListProductsOutput {
  async list(): Promise<Product[]> {
    return Promise.resolve([productFake]);
  }
}
