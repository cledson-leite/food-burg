import { Product } from '../../core/entity/product';

export interface IListProductsOutput {
  list(): Promise<Product[]>;
}
