import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({ example: 'Event Name', description: 'Name of the Event' })
  readonly name: string;
  readonly location: string;
  readonly maximum_places: number;
  readonly places_sold: number;
  readonly price: number;
  readonly manager: string;
}

export class UpdateEventDto {
  name?: string;
  location?: string;
  maximum_places?: number;
  places_sold?: number;
  price?: number;
  tickets?: string[];
  manager?: string;
}
