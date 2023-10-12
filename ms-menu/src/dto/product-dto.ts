import { IsNumber, IsString, IsBoolean, IsEnum } from 'class-validator';
import { Category, Department, Product, Status } from '../core/entity/product';

export class ProductDto implements Product {
  @IsNumber()
  id?: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsBoolean()
  isAvailable: boolean;

  @IsEnum(Category)
  category: Category;

  @IsEnum(Department)
  department: Department;

  @IsEnum(Status)
  status: Status;
}
export class ProductBuilder {
  private product = new ProductDto();

  reset(): void {
    this.product = new ProductDto();
  }

  id(value: number): this {
    this.product.id = value;
    return this;
  }

  name(value: string): this {
    this.product.name = value;
    return this;
  }

  description(value: string): this {
    this.product.description = value;
    return this;
  }

  price(value: number): this {
    this.product.price = value;
    return this;
  }

  category(value: Category): this {
    this.product.category = value;
    return this;
  }

  department(value: Department): this {
    this.product.department = value;
    return this;
  }

  status(value: Status): this {
    this.product.status = value;
    return this;
  }

  isAvailable(value: boolean): this {
    this.product.isAvailable = value;
    return this;
  }

  builder(): ProductDto {
    return this.product;
  }
}
