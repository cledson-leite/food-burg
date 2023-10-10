import { IListProductsOutput } from '../../../port/output/ilist_products_output';

export class ListProducts {
  constructor(private readonly output: IListProductsOutput) {}
  execute() {
    this.output.show();
  }
}
