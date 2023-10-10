import { IListProductsOutput } from '../../port/output/ilist_products_output';
import { prismaMock } from '../mock/database/singleton';
import { ListProductsInfra } from './list-product-infra';

describe('List Products Infra', () => {
  let sut: IListProductsOutput;

  beforeEach(() => {
    sut = new ListProductsInfra(prismaMock);
  });
  it('Should call the db correctly', () => {
    sut.list();
    expect(prismaMock.product.findMany).toHaveBeenCalled();
  });
  it('Should throw error received', async () => {
    prismaMock.product.findMany.mockRejectedValueOnce(new Error());
    const promise = sut.list();
    await expect(promise).rejects.toThrowError();
  });
  it('Should return an empty list if no product is found', async () => {
    prismaMock.product.findMany.mockResolvedValueOnce([]);
    const result = await sut.list();
    expect(result).toEqual([]);
  });
});
