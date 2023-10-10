import { faker } from '@faker-js/faker';
import { Product } from '@prisma/client';
import { productFake } from '../../../core/use-case/mock/product-faker';

export const response: Product = {
  ...productFake,
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.anytime(),
};
