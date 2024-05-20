interface Period {
  from: string;
  to: string;
}

interface OpeningHours {
  monday: Period;
  tuesday: Period;
  wednesday: Period;
  thursday: Period;
  friday: Period;
  saturday: Period;
  sunday: Period;
}
export enum LocationStatus {
  available = 'available',
  maintenance = 'maintenance',
  closed = 'closed',
}
export class Location {
  id: number;
  address: string;
  city: string;
  streetName: string;
  postalCode: string;
  openingHours: OpeningHours;
  status: LocationStatus;
  image: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  createdAt: Date;
  updatedAt: Date;
  distance?: number;

  constructor(
    id: number,
    address: string,
    city: string,
    streetName: string,
    postalCode: string,
    openingHours: OpeningHours,
    status: LocationStatus,
    image: string,
    coordinates: { latitude: number; longitude: number },
    createdAt: Date,
    updatedAt: Date,
    distance?: number,
  ) {
    this.id = id;
    this.address = address;
    this.city = city;
    this.streetName = streetName;
    this.postalCode = postalCode;
    this.openingHours = openingHours;
    this.status = status;
    this.image = image;
    this.coordinates = coordinates;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.distance = distance;
  }

  static fromJson(json: any): Location {
    return new Location(
      json.id,
      json.address,
      json.city,
      json.streetName,
      json.postalCode,
      json.openingHours,
      json.status,
      json.image,
      json.coordinates,
      json.createdAt,
      json.updatedAt,
      json.distance,
    );
  }

  toJson(): any {
    return {
      id: this.id,
      address: this.address,
      city: this.city,
      streetName: this.streetName,
      postalCode: this.postalCode,
      openingHours: this.openingHours,
      status: this.status,
      image: this.image,
      coordinates: this.coordinates,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      distance: this.distance,
    };
  }
}
