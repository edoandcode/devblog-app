import React from 'react';

import Image from 'next/image';

import type { ApiArticle } from '@/types/api/data-types';

const ArticleItem = ({ article }: { article: ApiArticle }) => {
    return (
        <div className=' rounded-2xl p-5 w-full shadow-[0_0_20px_0_rgba(255,255,255,0.5)] transition-shadow duration-300'>
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">{article.title}</h2>
            <Image
                src={article.cover_image.url}
                alt={article.title}
                width={article.cover_image.width}
                height={article.cover_image.height}
            ></Image>
            <p>{article.abstract}</p>
        </div>
    )
}

export default ArticleItem