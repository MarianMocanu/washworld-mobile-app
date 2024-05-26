import { User } from './User';
import { Subscription } from './Subscription';
// import { Event } from './Event';

export class Car {
  id: number;
  plateNumber: string;
  name: string;
  user: User;
  // events?: Event[];
  subscriptions?: Subscription[];
  createdAt: string;
  updatedAt: string;

  constructor(
    id: number,
    plateNumber: string,
    name: string,
    user: User,
    // events: Event[],
    subscriptions: Subscription[],
    createdAt: string,
    updatedAt: string,
  ) {
    this.id = id;
    this.plateNumber = plateNumber;
    this.name = name;
    this.user = user;
    // this.events = events;
    this.subscriptions = subscriptions;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(json: any): Car {
    return new Car(
      json.id,
      json.plateNumber,
      json.name,
      User.fromJson(json.user),
      // json.events ? json.events.map((event: any) => Event.fromJson(event)) : undefined,
      json.subscriptions
        ? json.subscriptions.map((subscription: any) => Subscription.fromJson(subscription))
        : undefined,
      json.createdAt,
      json.updatedAt,
    );
  }

  toJson(): any {
    return {
      id: this.id,
      plateNumber: this.plateNumber,
      name: this.name,
      user: this.user.toJson(),
      // events: this.events ? this.events.map((event) => event.toJson()) : undefined,
      subscriptions: this.subscriptions
        ? this.subscriptions.map(subscription => subscription.toJson())
        : undefined,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
