import { Product } from '../../entity/product';
import { IListService } from '../../../port/output/ilist_service';
import { productFake } from './product-faker';

export class ListServiceStub implements IListService {
  async list(): Promise<Product[]> {
    return Promise.resolve([productFake]);
  }
}
