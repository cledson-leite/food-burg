import { ProductDto } from '../../dto/product-dto';

export interface IRegisterProduct {
  execute(product: ProductDto): Promise<void>;
}
