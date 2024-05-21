import { Car } from './Car';
import { Level } from './Level';

export class Subscription {
  id: number;
  active: boolean;
  expiresAt: Date;
  car: Car;
  level: Level;
  //   invoices: Invoice[];
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    active: boolean,
    expiresAt: Date,
    car: Car,
    level: Level,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.active = active;
    this.expiresAt = expiresAt;
    this.car = car;
    this.level = level;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(json: any): Subscription {
    return new Subscription(
      json.id,
      json.active,
      new Date(json.expiresAt),
      Car.fromJson(json.car),
      Level.fromJson(json.level),
      new Date(json.createdAt),
      new Date(json.updatedAt),
    );
  }

  toJson(): any {
    return {
      id: this.id,
      active: this.active,
      expiresAt: this.expiresAt.toISOString(),
      car: this.car.toJson(),
      level: this.level.toJson(),
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}
