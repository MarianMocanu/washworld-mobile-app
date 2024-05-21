export class Step {
  id: number;
  name: string;
  order: number;
  description: string;
  duration: number;
  createdAt: Date;

  constructor(
    id: number,
    name: string,
    order: number,
    description: string,
    duration: number,
    createdAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.order = order;
    this.description = description;
    this.duration = duration;
    this.createdAt = createdAt;
  }

  static fromJson(json: any): Step {
    return new Step(
      json.id,
      json.name,
      json.order,
      json.description,
      json.duration,
      new Date(json.createdAt),
    );
  }

  toJson(): any {
    return {
      id: this.id,
      name: this.name,
      order: this.order,
      description: this.description,
      duration: this.duration,
      createdAt: this.createdAt,
    };
  }
}
