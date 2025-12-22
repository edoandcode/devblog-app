import { API } from '@/settings/api';

export type FetchApiOptions = RequestInit

/**
 * Performs a typed request to the application API.
 *
 * @template T - The expected response data type.
 * @async
 * @function fetchApi
 *
 * @param {string} path - The API endpoint path. Leading slashes are automatically removed.
 * @param {FetchApiOptions} [options={ method: 'GET' }] - Standard `fetch` options such as method, headers, and body.
 * @param {boolean} [deep=true] - Whether to append the `pLevel=5` query parameter for deep population on Strapi (or similar APIs).
 *
 * @returns {Promise<T | null>} Resolves with the parsed JSON response, or `null` if the server returns a non-OK status or the response cannot be parsed.
 *
 * @throws {Error} Throws when a network failure occurs or the fetch call itself rejects.
 */
export async function fetchApi<T = unknown>(
    path: string,
    options: FetchApiOptions = { method: 'GET' },
    deep: boolean = true,

): Promise<T | null> {
    path = path.startsWith('/') ? path.slice(1) : path

    const url = new URL(`${API.BASE_URL}/${path}`)

    if (deep) {
        url.searchParams.append('pLevel', '5')
    }

    try {

        const res = await fetch(url.href, {
            ...options,
            headers: {
                ...options.headers,
            },
        })

        if (!res.ok) {
            let errorMsg = "Unexpected error";

            try {
                const errorBody = await res.json();
                errorMsg = errorBody?.error?.message || errorBody?.message || errorMsg;
            } catch {
                // fallback se non è JSON
                errorMsg = `HTTP ${res.status}`;
            }

            console.error(`API request failed: ${errorMsg}`);
            return null
        }

        try {
            const data = await res.json()
            return data as T
        } catch {
            console.error("Failed to parse JSON response");
            return null;
        }
    } catch (err) {
        if (err instanceof Error) throw err;
        throw new Error("Network error or invalid response");
    }



}