import React from 'react';

import Grid from '@/components/Grid';

import { getStrapiData } from '@/services/api';
import { API } from '@/settings/api';

import type { ApiArticle } from '@/types/api/data-types';

type ArticlePageProps = {
    params: Promise<{ ['article-slug']: string }>
}


export async function generateStaticParams() {
    const articles = await getStrapiData<ApiArticle[]>(`${API.ARTICLES}`, true)

    if (!articles)
        return []

    return articles.map((item) => ({
        'article-slug': item.slug,
    }))

}

const ArticlePage = async (props: ArticlePageProps) => {

    const { params } = props
    const { ['article-slug']: articleSlug } = await params

    const articleData = await getStrapiData<ApiArticle>(`${API.ARTICLES}/${articleSlug}`)


    return (
        <div>
            <Grid>
                <Grid.Col
                    span={12}
                >
                    <h2>{articleData?.title}</h2>
                </Grid.Col>
            </Grid>
        </div>
    )
}

export default ArticlePage