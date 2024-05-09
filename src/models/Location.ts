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
    };
  }
}
