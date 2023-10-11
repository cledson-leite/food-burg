import { IListProducts } from '../../../port/input/ilist-products';
import { IListProductsOutput } from '../../../port/output/ilist_products_output';
import { Product } from '../../entity/product';

export class ListProducts implements IListProducts {
  constructor(private readonly output: IListProductsOutput) {}
  async execute(): Promise<Product[]> {
    return await this.output.list();
  }
}
