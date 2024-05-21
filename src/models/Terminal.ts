import { Location } from './Location';
import { Service } from './Service';

export enum TerminalStatus {
  idle = 'idle',
  busy = 'busy',
  maintenance = 'maintenance',
  closed = 'closed',
}

export class Terminal {
  id: number;
  status: TerminalStatus;
  location?: Location;
  services?: Service[];
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    status: TerminalStatus,
    createdAt: Date,
    updatedAt: Date,
    location?: Location,
    services?: Service[],
  ) {
    this.id = id;
    this.status = status;
    this.location = location;
    this.services = services;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(json: any): Terminal {
    return new Terminal(
      json.id,
      json.status,
      new Date(json.createdAt),
      new Date(json.updatedAt),
      json.location,
      json.services,
    );
  }

  toJson(): any {
    return {
      id: this.id,
      status: this.status,
      location: this.location,
      services: this.services,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
