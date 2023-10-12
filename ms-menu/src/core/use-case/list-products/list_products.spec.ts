import { faker } from '@faker-js/faker';

import { IListService } from '../../../port/output/ilist_service';
import { ListProducts } from './list_products';
import { ListServiceStub } from '../mock/list_service_stub';
import { productFake } from '../mock/product-faker';
import { IListProducts } from '../../../port/input/ilist-products';

describe('List Products', () => {
  let output: IListService;
  let sut: IListProducts;

  beforeEach(() => {
    output = new ListServiceStub();
    sut = new ListProducts(output);
  });
  it('Should call output correctly', async () => {
    const listSpy = jest.spyOn(output, 'list');
    sut.execute();
    expect(listSpy).toHaveBeenCalled();
  });
  it('Should throw error 500 when receiving error', async () => {
    const error = faker.lorem.sentence(3);
    jest.spyOn(output, 'list').mockRejectedValueOnce(new Error(error) as never);
    const promise = sut.execute();
    await expect(promise).rejects.toThrowError(error);
  });
  it('Should return a list of products', async () => {
    const result = await sut.execute();
    expect(result).toEqual([productFake]);
  });
});
