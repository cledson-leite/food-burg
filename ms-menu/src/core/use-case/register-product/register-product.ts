import { IRegisterProduct } from '../../../port/input/iregister-product';
import { IRegisterService } from '../../../port/output/iregister_service';
import { Product } from '../../entity/product';

export class RegisterProduct implements IRegisterProduct {
  constructor(private readonly output: IRegisterService) {}
  async execute(product: Product) {
    await this.output.register(product);
  }
}
