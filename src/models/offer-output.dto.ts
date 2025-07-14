import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/* ----------------------------- Sub-structures ----------------------------- */

export class ProviderOutputDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  fantasyName: string;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  verified: boolean;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  phone: string;
}

export class ServicesOutputDto {
  @ApiProperty({ type: [String] })
  general: string[];

  @ApiProperty({ type: [String] })
  special: string[];

  @ApiProperty({ type: [String] })
  location: string[];
}

export class AppearanceOutputDto {
  @ApiProperty()
  age: number;

  @ApiProperty()
  sex: string;

  @ApiProperty()
  body: string;

  @ApiProperty()
  hair: string;

  @ApiProperty()
  height: number;

  @ApiProperty()
  weight: number;

  @ApiProperty()
  breasts: string;

  @ApiProperty()
  ethnicity: string;

  @ApiProperty()
  pubicHair: string;
}

export class AvailabilityOutputDto {
  @ApiProperty({ type: [String] })
  days: string[];

  @ApiProperty()
  startTime: string;

  @ApiProperty()
  endTime: string;
}

export class OfferInfosOutputDto {
  @ApiProperty({ type: ServicesOutputDto })
  services: ServicesOutputDto;

  @ApiProperty({ type: AppearanceOutputDto })
  appearance: AppearanceOutputDto;

  @ApiProperty({ type: AvailabilityOutputDto })
  availability: AvailabilityOutputDto;
}

export class OfferMetadataOutputDto {
  @ApiProperty()
  sex: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  currency: string;

  @ApiProperty({ type: OfferInfosOutputDto })
  offerInfos: OfferInfosOutputDto;

  @ApiProperty()
  description: string;

  @ApiProperty()
  hasExplicitContent: boolean;
}

/* --------------------------------- Output --------------------------------- */

export class OfferOutputDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  location: string;

  @ApiProperty({ type: ProviderOutputDto })
  provider: ProviderOutputDto;

  @ApiProperty({ type: [String] })
  images: string[];

  @ApiProperty({ type: [String] })
  audios: string[];

  @ApiProperty({ type: [String] })
  videos: string[];

  @ApiProperty({ type: OfferMetadataOutputDto })
  metadata: OfferMetadataOutputDto;

  @ApiProperty()
  boosted: boolean;

  @ApiProperty()
  category: string;

  @ApiProperty()
  sex: string;

  @ApiProperty()
  hasExplicitContent: boolean;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}

export class PaginationMetadataDto {
  @ApiProperty()
  page: number;

  @ApiProperty()
  size: number;

  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  totalPages: number;
}

export class OffersPaginatedOutputDto {
  @ApiProperty({ type: PaginationMetadataDto })
  metadata: PaginationMetadataDto;

  @ApiProperty({ type: [OfferOutputDto] })
  offers: OfferOutputDto[];
}