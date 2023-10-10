import { Product } from '../../core/entity/product';

export interface IListProductsOutput {
  show(): Promise<Product[]>;
}
