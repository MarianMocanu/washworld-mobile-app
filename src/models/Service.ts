export enum ServiceType {
  auto = 'auto',
  self = 'self',
  vacuum = 'vacuum',
}

export class Service {
  id: number;
  createdAt: Date;
  type: ServiceType;
  price: number;

  constructor(id: number, createdAt: Date, type: ServiceType, price: number) {
    this.id = id;
    this.type = type;
    this.price = price;
    this.createdAt = createdAt;
  }

  static fromJson(json: any): Service {
    return new Service(json.id, json.type, json.price, json.createdAt);
  }

  toJson(): any {
    return {
      id: this.id,
      type: this.type,
      price: this.price,
      createdAt: this.createdAt,
    };
  }
}
