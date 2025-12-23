import React from 'react';

import Grid from '@/components/Grid';

import ArticleItem from './ArticleItem';

import type { ApiArticle } from '@/types/api/data-types';

const ArticlesList = ({ articles }: { articles: ApiArticle[] | null }) => {
    return (
        <Grid>
            {articles?.map((article) => (
                <Grid.Col
                    span={12}
                    span-md={6}
                    span-xl={4}
                    key={article.id}
                >
                    <ArticleItem article={article} />
                </Grid.Col>
            ))}
        </Grid>
    )
}

export default ArticlesList