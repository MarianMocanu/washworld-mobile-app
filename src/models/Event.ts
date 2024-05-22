import { Car } from './Car';
import { Service } from './Service';
import { Terminal } from './Terminal';

export class Event {
  id: number;
  car: Car;
  service: Service;
  terminal: Terminal;
  // invoices: Invoice[];
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    car: Car,
    service: Service,
    terminal: Terminal,
    // invoices: Invoice[],
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.car = car;
    this.service = service;
    this.terminal = terminal;
    // this.invoices = invoices;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(json: any): Event {
    return new Event(
      json.id,
      Car.fromJson(json.car),
      Service.fromJson(json.service),
      Terminal.fromJson(json.terminal),
      // json.invoices ? json.invoices.map((invoice: any) => Invoice.fromJson(invoice)) : undefined,
      json.createdAt,
      json.updatedAt,
    );
  }

  toJson(): any {
    return {
      id: this.id,
      car: this.car.toJson(),
      service: this.service.toJson(),
      terminal: this.terminal.toJson(),
      // invoices: this.invoices ? this.invoices.map((invoice) => invoice.toJson()) : undefined,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

