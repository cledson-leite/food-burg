import { IListProducts } from '../../../port/input/ilist-products';
import { IListService } from '../../../port/output/ilist_service';
import { Product } from '../../entity/product';

export class ListProducts implements IListProducts {
  constructor(private readonly output: IListService) {}
  async execute(): Promise<Product[]> {
    return await this.output.list();
  }
}
