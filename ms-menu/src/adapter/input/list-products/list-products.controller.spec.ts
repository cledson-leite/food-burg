import { TestBed } from '@automock/jest';
import { faker } from '@faker-js/faker';
import { ListProductsController } from './list-products.controller';
import { ListProductsService } from './list-products.service';
import { productFake } from '../../../core/use-case/mock/product-faker';

describe('List Products Controller', () => {
  let service: jest.Mocked<ListProductsService>;
  let sut: ListProductsController;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(ListProductsController)
      .mock(ListProductsService)
      .using({ handle: jest.fn() })
      .compile();
    service = unitRef.get(ListProductsService);
    sut = unit;
  });

  it('Should call the service correctly', () => {
    const handleSpy = jest.spyOn(service, 'handle');
    sut.get();
    expect(handleSpy).toHaveBeenCalled();
  });
  it('Should throw error 500 received', async () => {
    const error = faker.lorem.sentence(3);
    jest.spyOn(service, 'handle').mockRejectedValueOnce(new Error(error));
    const resullt = await sut.get();
    expect(resullt).toEqual({
      status: 500,
      error: error,
    });
  });
  it('Should throw error 404 if it receives an empty list', async () => {
    jest.spyOn(service, 'handle').mockResolvedValueOnce([]);
    const resullt = await sut.get();
    expect(resullt).toEqual({
      status: 404,
      error: 'Produto não encontrado',
    });
  });
  it('Should return list of product data', async () => {
    jest.spyOn(service, 'handle').mockResolvedValueOnce([productFake]);
    const resullt = await sut.get();
    expect(resullt).toEqual({
      status: 200,
      data: [productFake],
    });
  });
});
