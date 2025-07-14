import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { SearchOfferFilterQueryInput } from '../models/search-offer-filter-query.input';
import {
  OffersPaginatedOutputDto,
  OfferOutputDto,
  PaginationMetadataDto,
} from '../models/offer-output.dto';

@Injectable()
export class OfferService {
  constructor(private readonly prisma: PrismaClient) {}

  /**
   * Search offers applying all available filters.
   */
  async searchOffers(
    input: SearchOfferFilterQueryInput,
  ): Promise<OffersPaginatedOutputDto> {
    const {
      city,
      state,
      category,
      sex,
      priceMin,
      priceMax,
      ageMin,
      ageMax,
      page = 1,
      size = 10,
      ethnicity,
      availableFor,
      contactMethods,
      offerContent,
      height,
      bodyType,
      hairColor,
      pubicHair,
      generalServices,
      specialServices,
      localServices,
    } = input;

    const skip = (page - 1) * size;
    const take = size;

    /* ----------------------------------------------------------------------- */
    /*                             Offer conditions                            */
    /* ----------------------------------------------------------------------- */
    const offerConditions: any[] = [];

    if (category) {
      offerConditions.push({
        metadata: {
          path: ['category'],
          equals: category,
        },
      });
    }

    if (sex) {
      offerConditions.push({
        metadata: {
          path: ['sex'],
          equals: sex,
        },
      });
    }

    // JSON arrays: use `in` operator to match ANY value inside filter array.
    if (availableFor?.length) {
      offerConditions.push({
        metadata: {
          path: ['availableFor'],
          in: availableFor,
        },
      });
    }

    if (contactMethods?.length) {
      offerConditions.push({
        metadata: {
          path: ['contactMethods'],
          in: contactMethods,
        },
      });
    }

    if (offerContent?.length) {
      offerConditions.push({
        metadata: {
          path: ['offerContent'],
          in: offerContent,
        },
      });
    }

    // Services
    if (generalServices?.length) {
      offerConditions.push({
        metadata: {
          path: ['offerInfos', 'services', 'general'],
          in: generalServices,
        },
      });
    }

    if (specialServices?.length) {
      offerConditions.push({
        metadata: {
          path: ['offerInfos', 'services', 'special'],
          in: specialServices,
        },
      });
    }

    if (localServices?.length) {
      offerConditions.push({
        metadata: {
          path: ['offerInfos', 'services', 'location'],
          in: localServices,
        },
      });
    }

    // Age filter (nested in appearance)
    if (ageMin !== undefined || ageMax !== undefined) {
      offerConditions.push({
        metadata: {
          path: ['offerInfos', 'appearance', 'age'],
          ...(ageMin !== undefined ? { gte: ageMin } : {}),
          ...(ageMax !== undefined ? { lte: ageMax } : {}),
        },
      });
    }

    // Price filter
    if (priceMin !== undefined || priceMax !== undefined) {
      offerConditions.push({
        metadata: {
          path: ['price'],
          ...(priceMin !== undefined ? { gte: priceMin } : {}),
          ...(priceMax !== undefined ? { lte: priceMax } : {}),
        },
      });
    }

    /* ----------------------------------------------------------------------- */
    /*                            Profile conditions                           */
    /* ----------------------------------------------------------------------- */
    const profileConditions: any[] = [];

    if (ethnicity?.length) {
      profileConditions.push({
        metadata: {
          path: ['ethnicity'],
          in: ethnicity,
        },
      });
    }

    if (height?.length) {
      profileConditions.push({
        metadata: {
          path: ['height'],
          in: height,
        },
      });
    }

    if (bodyType?.length) {
      profileConditions.push({
        metadata: {
          path: ['bodyType'],
          in: bodyType,
        },
      });
    }

    if (hairColor?.length) {
      profileConditions.push({
        metadata: {
          path: ['hairColor'],
          in: hairColor,
        },
      });
    }

    if (pubicHair) {
      profileConditions.push({
        metadata: {
          path: ['pubicHair'],
          equals: pubicHair,
        },
      });
    }

    /* ----------------------------------------------------------------------- */
    /*                                WHERE CLAUSE                             */
    /* ----------------------------------------------------------------------- */

    const whereClause: any = {
      ...(city && { city }),
      ...(state && { state }),
      AND: [
        ...offerConditions,
        ...(profileConditions.length
          ? [{ profile: { AND: profileConditions } }]
          : []),
      ].filter((c) => Object.keys(c).length > 0),
    };

    /* ----------------------------------------------------------------------- */
    /*                            DATABASE QUERY                                */
    /* ----------------------------------------------------------------------- */

    const [offers, totalItems] = await Promise.all([
      this.prisma.offer.findMany({
        where: whereClause,
        include: {
          profile: true,
          medias: true,
          boostSubscriptions: {
            where: {
              status: 'ACTIVE',
              expiresAt: { gte: new Date() },
            },
            orderBy: { startedAt: 'desc' },
          },
        },
        skip,
        take,
        orderBy: [
          { boostSubscriptions: { _count: 'desc' } },
          { createdAt: 'desc' },
        ],
      }),
      this.prisma.offer.count({ where: whereClause }),
    ]);

    /* ----------------------------------------------------------------------- */
    /*                      Transform entities into DTO                         */
    /* ----------------------------------------------------------------------- */

    const transformedOffers: OfferOutputDto[] = offers.map((offer) => ({
      id: offer.id,
      title: (offer.metadata as any)?.title || '',
      description: (offer.metadata as any)?.description || '',
      price: (offer.metadata as any)?.price || 0,
      currency: (offer.metadata as any)?.currency || 'USD',
      location: `${offer.city}, ${offer.state}`,
      provider: {
        id: offer.profile.id,
        fantasyName: offer.profile.name,
        rating: (offer.profile.metadata as any)?.rating || 0,
        verified: (offer.profile.metadata as any)?.verified || false,
        avatar: (offer.profile.metadata as any)?.avatar || '',
        phone: (offer.profile.metadata as any)?.phone || '',
      },
      images:
        offer.medias?.filter((m) => m.type === 'IMAGE').map((m) => m.url) || [],
      audios:
        offer.medias?.filter((m) => m.type === 'AUDIO').map((m) => m.url) || [],
      videos:
        offer.medias?.filter((m) => m.type === 'VIDEO').map((m) => m.url) || [],
      metadata: offer.metadata as any,
      boosted: offer.boostSubscriptions.length > 0,
      category: (offer.metadata as any)?.category || '',
      sex: (offer.metadata as any)?.sex || '',
      hasExplicitContent: (offer.metadata as any)?.hasExplicitContent || false,
      createdAt: offer.createdAt.toISOString(),
      updatedAt: offer.updatedAt.toISOString(),
    }));

    const totalPages = Math.ceil(totalItems / size);
    const meta: PaginationMetadataDto = {
      page,
      size,
      totalItems,
      totalPages,
    };

    return { metadata: meta, offers: transformedOffers };
  }
}