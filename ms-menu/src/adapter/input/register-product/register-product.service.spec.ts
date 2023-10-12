import { TestBed } from '@automock/jest';
import { IRegisterProduct } from '../../../port/input/iregister-product';
import { RegisterProductService } from './register-product.service';
import { productFake } from '../../../core/use-case/mock/product-faker';
import { faker } from '@faker-js/faker';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('RegisterProductService', () => {
  let cacheMocked: jest.Mocked<Cache>;
  let input: jest.Mocked<IRegisterProduct>;
  let sut: RegisterProductService;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(RegisterProductService).compile();
    cacheMocked = unitRef.get(CACHE_MANAGER);
    input = unitRef.get('core');
    sut = unit;
  });
  it('Should call the input correctly', () => {
    const executeSpy = jest.spyOn(input, 'execute');
    sut.handle(productFake);
    expect(executeSpy).toHaveBeenCalledWith(productFake);
  });
  it('Should throw error received', async () => {
    const error = faker.lorem.sentence(3);
    jest.spyOn(input, 'execute').mockRejectedValueOnce(new Error(error));
    const promise = sut.handle(productFake);
    await expect(promise).rejects.toThrowError(error);
  });
  it('Should clear the cache', async () => {
    const resetSpy = jest.spyOn(cacheMocked, 'reset');
    await sut.handle(productFake);
    expect(resetSpy).toHaveBeenCalled();
  });
});
