
import ArticlesList from '@/components/ArticlesList';

import { getStrapiData } from '@/services/api';
import { API } from '@/settings/api';
import { ApiArticle } from '@/types/api/data-types';

export default async function Home() {


  const articles = await getStrapiData<ApiArticle[]>(`${API.ARTICLES}`)



  return (
    <div>
      <ArticlesList articles={articles}></ArticlesList>
    </div>
  );
}
