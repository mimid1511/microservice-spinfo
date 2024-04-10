export class CreateEventDto {
  readonly name: string;
  readonly location: string;
  readonly maximum_places: number;
  readonly places_sold: number;
  readonly price: number;
  readonly tickets: string[];
}

export class UpdateEventDto {
  name?: string;
  location?: string;
  maximum_places?: number;
  places_sold?: number;
  price?: number;
  tickets?: string[];
}
