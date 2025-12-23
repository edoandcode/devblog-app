module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/articles/:slug',
            handler: 'api::article.article.findOneBySlug'
        }
    ]
}