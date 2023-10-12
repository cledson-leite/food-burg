import { Product } from '../../core/entity/product';

export interface IListService {
  list(): Promise<Product[]>;
}
