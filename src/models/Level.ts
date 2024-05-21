import { Service } from './Service';

export class Level {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  services: Service[];

  constructor(id: number, name: string, createdAt: Date, updatedAt: Date, services: Service[]) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.services = services;
  }

  static fromJson(json: any): Level {
    return new Level(json.id, json.name, new Date(json.createdAt), new Date(json.updatedAt), json.services);
  }

  toJson(): any {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      services: this.services,
    };
  }
}
