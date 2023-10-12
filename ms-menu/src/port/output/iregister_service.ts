import { ProductDto } from '../../dto/product-dto';

export interface IRegisterService {
  register(product: ProductDto): Promise<void>;
}
