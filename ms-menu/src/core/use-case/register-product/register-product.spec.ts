import { faker } from '@faker-js/faker';
import { IRegisterService } from '../../../port/output/iregister_service';
import { productFake } from '../mock/product-faker';
import { RegisterServiceStub } from '../mock/register_service-stub';
import { RegisterProduct } from './register-product';
import { IRegisterProduct } from '../../../port/input/iregister-product';

describe('Register Product', () => {
  let output: IRegisterService;
  let sut: IRegisterProduct;

  beforeEach(() => {
    output = new RegisterServiceStub();
    sut = new RegisterProduct(output);
  });
  it('Should call output correctly', async () => {
    const registerSpy = jest.spyOn(output, 'register');
    sut.execute(productFake);
    expect(registerSpy).toHaveBeenCalledWith(productFake);
  });
  it('Should throw error received', async () => {
    const error = faker.lorem.sentence(3);
    jest.spyOn(output, 'register').mockRejectedValueOnce(new Error(error));
    const promise = sut.execute(productFake);
    await expect(promise).rejects.toThrowError(error);
  });
  it('Should throw error received', async () => {
    const error = faker.lorem.sentence(3);
    jest.spyOn(output, 'register').mockRejectedValueOnce(new Error(error));
    const promise = sut.execute(productFake);
    await expect(promise).rejects.toThrowError(error);
  });
});
