/**
 * article controller
 */

import { factories } from '@strapi/strapi';

import findBySlug from '../../../utils/api/findBySlug';

export default factories.createCoreController('api::article.article', ({ strapi }) => {
    return ({
        async findOneBySlug(ctx) {
            const { params: { slug }, query } = ctx
            const entity = await findBySlug(strapi, 'api::article.article', slug, query)
            const sanitizeEntity = await this.sanitizeOutput(entity, ctx)
            return this.transformResponse(sanitizeEntity)
        }
    })

});
