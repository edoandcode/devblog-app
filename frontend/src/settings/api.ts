const API = {
    /*BASE */
    ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
    BASE_URL: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api`,
    TOKEN: process.env.NEXT_PUBLIC_API_TOKEN,
    /*NAVIGATION*/
    MAIN_NAVIGATION: 'navigation/render/navigation',
    /*COLLECTION TYPES */
    ARTICLES: 'articles',

}

const REVALIDATION_TIME = 60 //seconds

export {
    API,
    REVALIDATION_TIME,
}