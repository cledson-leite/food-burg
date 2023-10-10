import { TestBed } from '@automock/jest';
import { IListProducts } from '../../../port/input/ilist-products';
import { ListProductsService } from './list-products.service';
import { productFake } from '../../../core/use-case/mock/product-faker';

describe('ListProductsService', () => {
  let input: jest.Mocked<IListProducts>;
  let sut: ListProductsService;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(ListProductsService).compile();
    input = unitRef.get('input');
    sut = unit;
  });

  it('Should call input correctly', () => {
    const executeSpy = jest.spyOn(input, 'execute');
    sut.handle();
    expect(executeSpy).toHaveBeenCalled();
  });
  it('Should throw error received', async () => {
    jest.spyOn(input, 'execute').mockRejectedValueOnce(new Error());
    const promise = sut.handle();
    await expect(promise).rejects.toThrowError();
  });
  it('Should return an empty list that receives', async () => {
    jest.spyOn(input, 'execute').mockResolvedValueOnce([]);
    const result = await sut.handle();
    expect(result).toEqual([]);
  });
  it('Should return a list of product data', async () => {
    jest.spyOn(input, 'execute').mockResolvedValueOnce([productFake]);
    const result = await sut.handle();
    expect(result).toEqual([productFake]);
  });
});
