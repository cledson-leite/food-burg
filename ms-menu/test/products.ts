import { faker } from '@faker-js/faker';
import { ProductBuilder } from '../src/dto/product-dto';
const product1 = new ProductBuilder()
  .name(faker.commerce.productName())
  .description(faker.commerce.productDescription())
  .price(Number(faker.commerce.price()))
  .category(faker.number.int({ min: 0, max: 7 }))
  .department(faker.number.int({ min: 0, max: 1 }))
  .isAvailable(faker.datatype.boolean())
  .builder();

const product2 = new ProductBuilder()
  .name(faker.commerce.productName())
  .description(faker.commerce.productDescription())
  .price(Number(faker.commerce.price()))
  .category(faker.number.int({ min: 0, max: 7 }))
  .department(faker.number.int({ min: 0, max: 1 }))
  .isAvailable(faker.datatype.boolean())
  .builder();

export { product1, product2 };
