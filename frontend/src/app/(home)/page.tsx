import Image from 'next/image';

import ArticlesList from '@/components/ArticlesList';
import Header from '@/components/Header';
import Logo from '@/components/Logo';

import { getStrapiData } from '@/services/api';
import { API } from '@/settings/api';
import { ApiArticle } from '@/types/api/data-types';

export default async function Home() {


  const articles = await getStrapiData<ApiArticle[]>(`${API.ARTICLES}`)



  return (
    <div>
      <Header></Header>
      <ArticlesList articles={articles}></ArticlesList>
    </div>
  );
}
