import React from 'react';

import { ArrowBigLeft } from 'lucide-react';
import Link from 'next/link';

import Grid from '@/components/Grid';
import StrapiRichTextBlockParser from '@/components/StrapiRichTextBlockParser';

import { getStrapiData } from '@/services/api';
import { API } from '@/settings/api';
import { ROUTES } from '@/settings/routes';

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
                    span-2xl={10}
                    offset-2xl={1}
                >
                    <Link
                        href={ROUTES.HOME}
                        className='flex gap-2 text-sm items-center mb-5 hover:text-secondary'
                    >
                        <ArrowBigLeft></ArrowBigLeft>
                        Back to Home
                    </Link>
                </Grid.Col>
                <Grid.Col
                    span={12}
                    span-2xl={10}
                    offset-2xl={1}
                >
                    <h1 className="text-4xl text-positive mb-2 mb-10">{articleData?.title}</h1>
                    <StrapiRichTextBlockParser
                        content={articleData?.text_content}
                    ></StrapiRichTextBlockParser>
                </Grid.Col>
            </Grid>
        </div>
    )
}

export default ArticlePage