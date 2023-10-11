export interface Product {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly isAvailable: boolean;
  readonly category: Category;
  readonly department: Department;
  readonly status: Status;
}

export enum Category {
  BEER,
  REFRIGERATOR,
  JUICE,
  WATER,
  ENTRANCE,
  MEAT,
  BIRD,
  DESSERT,
}

export enum Department {
  KITCHEN,
  DRINK,
}

export enum Status {
  REQUESTED,
  PREPARATION,
  READY,
  DELIVERED,
  CANCELED,
}
