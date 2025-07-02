import "server-only";

import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId,token } from '../env'

export const writeClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
    //if you want to fetch new data without needed to refresh the page use Live Content API on Sanity
    token,
})
if (!writeClient.config().token) {
    throw new Error(
        'Missing environment variable: SANITY_API_TOKEN. Please set it in your .env file.'
    )
}
