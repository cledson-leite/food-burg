import { Injectable, Inject } from '@nestjs/common';
import { IRegisterProduct } from '../../../port/input/iregister-product';
import { ProductDto } from '../../../dto/product-dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RegisterProductService {
  constructor(
    @Inject('core') private readonly input: IRegisterProduct,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  async handle(product: ProductDto) {
    await this.input.execute(product);
    await this.cache.reset();
  }
}
