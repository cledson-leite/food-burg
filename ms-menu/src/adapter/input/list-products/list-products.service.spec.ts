import { TestBed } from '@automock/jest';
import { IListProducts } from '../../../port/input/ilist-products';
import { ListProductsService } from './list-products.service';
import { productFake } from '../../../core/use-case/mock/product-faker';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('ListProductsService', () => {
  let cacheMocked: jest.Mocked<Cache>;
  let input: jest.Mocked<IListProducts>;
  let sut: ListProductsService;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(ListProductsService).compile();
    input = unitRef.get('input');
    cacheMocked = unitRef.get(CACHE_MANAGER);
    sut = unit;
  });

  it('Should call cache correctly', () => {
    const executeSpy = jest.spyOn(input, 'execute');
    const getSpy = jest
      .spyOn(cacheMocked, 'get')
      .mockResolvedValueOnce(JSON.stringify([productFake]));
    sut.handle();
    expect(getSpy).toHaveBeenCalledWith('products');
    expect(executeSpy).not.toHaveBeenCalled();
  });
  it('Should return a list of product data from cache', async () => {
    jest
      .spyOn(cacheMocked, 'get')
      .mockResolvedValueOnce(JSON.stringify([productFake]));
    const result = await sut.handle();
    expect(result).toEqual([productFake]);
  });
  it('Should call input correctly', async () => {
    const executeSpy = jest
      .spyOn(input, 'execute')
      .mockResolvedValueOnce([productFake]);
    await sut.handle();
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
  it('Should call set cache correctly', async () => {
    jest.spyOn(input, 'execute').mockResolvedValueOnce([productFake]);
    const setSpy = jest.spyOn(cacheMocked, 'set');
    await sut.handle();
    expect(setSpy).toHaveBeenCalledWith(
      'products',
      JSON.stringify([productFake]),
    );
  });
  it('Should return a list of product data', async () => {
    jest.spyOn(input, 'execute').mockResolvedValueOnce([productFake]);
    const result = await sut.handle();
    expect(result).toEqual([productFake]);
  });
});
