import { Level } from './Level';
import { Step } from './Step';
import { Terminal } from './Terminal';

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
  levels?: Level[];
  steps?: Step[];
  terminals?: Terminal[];

  constructor(
    id: number,
    createdAt: Date,
    type: ServiceType,
    price: number,
    levels?: Level[],
    steps?: Step[],
    terminals?: Terminal[],
  ) {
    this.id = id;
    this.type = type;
    this.price = price;
    this.createdAt = createdAt;
    this.levels = levels;
    this.steps = steps;
    this.terminals = terminals;
  }

  static fromJson(json: any): Service {
    return new Service(
      json.id,
      json.type,
      json.price,
      json.createdAt,
      json.levels,
      json.steps,
      json.terminals,
    );
  }

  toJson(): any {
    return {
      id: this.id,
      type: this.type,
      price: this.price,
      createdAt: this.createdAt,
      levels: this.levels,
      steps: this.steps,
      terminals: this.terminals,
    };
  }
}
