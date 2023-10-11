import { TestBed } from '@automock/jest';
import { IListProducts } from '../../../port/input/ilist-products';
import { ListProductsService } from './list-products.service';
import { productFake } from '../../../core/use-case/mock/product-faker';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { faker } from '@faker-js/faker';

describe('ListProductsService', () => {
  let input: jest.Mocked<IListProducts>;
  let sut: ListProductsService;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(ListProductsService).compile();
    input = unitRef.get('input');
    input.execute.mockClear();
    sut = unit;
  });

  it('Should call input correctly', () => {
    const executeSpy = jest
      .spyOn(input, 'execute')
      .mockResolvedValueOnce([productFake]);
    sut.handle();
    expect(executeSpy).toHaveBeenCalled();
  });
  it('Should throw error 404 if it receives an empty list', async () => {
    jest.spyOn(input, 'execute').mockResolvedValueOnce([]);
    const promise = sut.handle();
    await expect(promise).rejects.toThrowError(
      new NotFoundException('Produto não encontrado'),
    );
  });
  it('Should throw error 500', async () => {
    const error = faker.lorem.sentence(3);
    jest.spyOn(input, 'execute').mockRejectedValueOnce(new Error(error));
    const promise = sut.handle();
    await expect(promise).rejects.toThrowError(
      new InternalServerErrorException(error),
    );
  });
  it('Should return a list of product data', async () => {
    jest.spyOn(input, 'execute').mockResolvedValueOnce([productFake]);
    const result = await sut.handle();
    expect(result).toEqual([productFake]);
  });
});
