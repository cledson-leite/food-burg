import { faker } from '@faker-js/faker';
import { productFake } from '../../../core/use-case/mock/product-faker';
import { prismaMock } from '../../mock/database/singleton';
import { RegisterProductInfra } from './register-product-infra';

describe('List Products Infra', () => {
  const prisma = prismaMock.product;
  let sut: RegisterProductInfra;

  beforeEach(() => {
    sut = new RegisterProductInfra(prismaMock);
  });
  it('Should call the db correctly', () => {
    sut.register(productFake);
    expect(prisma.create).toHaveBeenCalledWith({
      data: productFake,
    });
  });
  it('Should throw error received', async () => {
    const error = faker.lorem.sentence(3);
    prisma.create.mockRejectedValueOnce(new Error(error));
    const promise = sut.register(productFake);
    await expect(promise).rejects.toThrowError(error);
  });
  it('Should throw error received', async () => {
    const error = faker.lorem.sentence(3);
    prisma.create.mockRejectedValueOnce(new Error(error));
    const promise = sut.register(productFake);
    await expect(promise).rejects.toThrowError(error);
  });
});
