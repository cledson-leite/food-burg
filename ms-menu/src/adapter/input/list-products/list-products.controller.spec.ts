import { TestBed } from '@automock/jest';
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
  it('Should throw error received', async () => {
    jest.spyOn(service, 'handle').mockRejectedValueOnce(new Error());
    const promise = sut.get();
    await expect(promise).rejects.toThrowError();
  });

  it('Should return list of product data', async () => {
    jest.spyOn(service, 'handle').mockResolvedValueOnce([productFake]);
    const resullt = await sut.get();
    expect(resullt).toEqual([productFake]);
  });
});
