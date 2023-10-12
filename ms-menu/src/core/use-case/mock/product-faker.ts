import { faker } from '@faker-js/faker';
import { Product } from '../../entity/product';

export const productFake: Product = {
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: Number(faker.commerce.price()),
  category: faker.number.int({ min: 0, max: 7 }),
  department: faker.number.int({ min: 0, max: 1 }),
  isAvailable: faker.datatype.boolean(),
};
