/**
 * Flattens a Strapi schema type by extracting its `attributes` fields
 * and merging them with common top-level fields like `id`.
 */
export type FlattenStrapiSchema<T extends { attributes: unknown }> =
    {
        id: number;
        documentId: string;
    } & {
        [K in keyof T['attributes']]: T['attributes'][K];
    };


export type StrapiCollectionResponse<T extends { attributes: unknown }> = {
    data: T[]
}

export type StrapiResponse<T extends { attributes: unknown }> = {
    data: FlattenStrapiSchema<T>;
}