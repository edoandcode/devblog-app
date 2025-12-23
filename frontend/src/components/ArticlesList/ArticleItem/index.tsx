import React from 'react';

import { ArrowBigRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import type { ApiArticle } from '@/types/api/data-types';

const ArticleItem = ({ article }: { article: ApiArticle }) => {
    return (
        <div className='flex flex-col gap-4 rounded-2xl p-5 w-full shadow-[0_0_20px_0_rgba(255,255,255,0.5)] relative'>
            <Link
                href={`/${article.slug}`}
                className="absolute z-10 inset-0"
            ></Link>
            <div className='flex items-center justify-between'>
                <h2 className="text-3xl mb-2 text-positive">{article.title}</h2>
                <ArrowBigRight />
            </div>
            <figure className="rounded-2xl overflow-hidden aspect-5/4 relative">
                <Image
                    src={article.cover_image.url}
                    alt={article.title}
                    width={article.cover_image.width}
                    height={article.cover_image.height}
                    className="object-cover w-full h-full"
                ></Image>
            </figure>
            <p>{article.abstract}</p>
        </div>
    )
}

export default ArticleItem