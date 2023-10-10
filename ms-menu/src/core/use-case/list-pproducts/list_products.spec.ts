import { IListProductsOutput } from '../../../port/output/ilist_products_output';
import { ListProducts } from './list_products';
import { ListProductsOutputStub } from '../mock/list_products_output_stub';

describe('List Products', () => {
  let output: IListProductsOutput;
  let sut: ListProducts;

  beforeEach(() => {
    output = new ListProductsOutputStub();
    sut = new ListProducts(output);
  });
  it('Should call output correctly', async () => {
    const showSpy = jest.spyOn(output, 'show');
    sut.execute();
    expect(showSpy).toHaveBeenCalled();
  });
});
