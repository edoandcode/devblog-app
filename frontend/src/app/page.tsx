import Image from 'next/image';

import { getStrapiData } from '@/services/api';
import { API } from '@/settings/api';
import { ApiArticle } from '@/types/api/data-types';

export default async function Home() {


  const articles = await getStrapiData<ApiArticle[]>(`${API.ARTICLES}`)



  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="p-4">
        <ul>
          {articles?.map((article) => (
            <li key={article.id} className="mb-6 p-4 border border-gray-300 rounded-lg bg-white dark:bg-gray-900">
              <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">{article.title}</h2>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
