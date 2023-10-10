import { faker } from '@faker-js/faker';

import { IListProductsOutput } from '../../../port/output/ilist_products_output';
import { ListProducts } from './list_products';
import { ListProductsOutputStub } from '../mock/list_products_output_stub';
import { productFake } from '../mock/product-faker';
import { IListProducts } from '../../../port/input/ilist-products';

describe('List Products', () => {
  let output: IListProductsOutput;
  let sut: IListProducts;

  beforeEach(() => {
    output = new ListProductsOutputStub();
    sut = new ListProducts(output);
  });
  it('Should call output correctly', async () => {
    const showSpy = jest.spyOn(output, 'show');
    sut.execute();
    expect(showSpy).toHaveBeenCalled();
  });
  it('Should throw error 500 when receiving error', async () => {
    const error = faker.lorem.sentence(3);
    jest.spyOn(output, 'show').mockRejectedValueOnce(new Error(error) as never);
    const promise = sut.execute();
    await expect(promise).rejects.toThrowError(error);
  });
  it('Should throw error 404 in case of receiving an empty list', async () => {
    jest.spyOn(output, 'show').mockResolvedValueOnce([] as never);
    const promise = sut.execute();
    await expect(promise).rejects.toThrowError('Produto não encontrado');
  });
  it('Should return a list of products', async () => {
    const result = await sut.execute();
    expect(result).toEqual([productFake]);
  });
});
