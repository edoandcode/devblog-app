import type {
    FlattenStrapiSchema,
    StrapiResponse
} from '@/types/utils/strapi-types';

import type {
    ApiArticleArticle,
} from '@/types/api/strapi/contentTypes'


export type ApiArticle = FlattenStrapiSchema<ApiArticleArticle>;
export type ApiArticleResponse = StrapiResponse<ApiArticleArticle>;