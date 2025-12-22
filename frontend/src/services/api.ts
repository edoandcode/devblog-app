import { API, REVALIDATION_TIME } from '@/settings/api';

import { fetchApi } from './http';

import type { FetchApiOptions } from './http';

/**
 * Performs a GET request to the specified API endpoint.
 *
 * @param endpoint - The API endpoint to fetch data from.
 * @param options - Optional fetch options.
 * @returns The response data from the API or an error.
 */
export const get = async <T>(endpoint: string, authorized?: boolean, options?: FetchApiOptions): Promise<T | null> => {
    return fetchApi<T>(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...(authorized ? { Authorization: `Bearer ${API.TOKEN}` } : {}),
            ...options?.headers,
        },
        next: {
            revalidate: REVALIDATION_TIME
        },
        ...options,
    });
}


export const getStrapiData = async <T>(endpoint: string, authorized?: boolean, options?: FetchApiOptions): Promise<T | null> => {
    const res = await get<{ data: T }>(endpoint, authorized, options);
    return res?.data || null;
}