import { Product } from '@prisma/client';
import { ProductBuilder, ProductDto } from '../../../dto/product-dto';

export class WrapperListProduct {
  public static toDto(json: Product): ProductDto {
    return new ProductBuilder()
      .id(json.id)
      .name(json.name)
      .description(json.description)
      .price(json.price)
      .isAvailable(json.isAvailable)
      .category(json.category)
      .department(json.department)
      .builder();
  }
}
