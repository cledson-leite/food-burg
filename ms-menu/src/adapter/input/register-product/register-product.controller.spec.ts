import { RegisterProductController } from './register-product.controller';
import { RegisterProductService } from './register-product.service';
import { TestBed } from '@automock/jest';
import { productFake } from '../../../core/use-case/mock/product-faker';
import { faker } from '@faker-js/faker';

describe('RegisterProductController', () => {
  let service: jest.Mocked<RegisterProductService>;
  let sut: RegisterProductController;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(RegisterProductController)
      .mock(RegisterProductService)
      .using({ handle: jest.fn() })
      .compile();
    service = unitRef.get(RegisterProductService);
    sut = unit;
  });

  it('Should call the service correctly', () => {
    const handleSpy = jest.spyOn(service, 'handle');
    sut.post(productFake);
    expect(handleSpy).toHaveBeenCalledWith(productFake);
  });
  it('Should throw error received', () => {
    const error = faker.lorem.sentence(3);
    jest.spyOn(service, 'handle').mockRejectedValueOnce(new Error(error));
    const promise = sut.post(productFake);
    expect(promise).rejects.toThrowError(error);
  });
});
