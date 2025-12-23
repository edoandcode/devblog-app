import type { Core } from '@strapi/strapi'

const findBySlug = async (
    strapi: Core.Strapi,
    uid: string,
    slug: string,
    query: Record<string, any> = {}
) => {
    const entity = await strapi.db.query(uid).findOne({
        where: {
            slug: {
                $eq: slug
            }
        },
        ...query,
    })
    return entity
}

export default findBySlug