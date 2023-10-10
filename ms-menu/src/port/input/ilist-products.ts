import { ProductDto } from '../../dto/product-dto';

export interface IListProducts {
  execute(): Promise<ProductDto[]>;
}
