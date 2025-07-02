import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  //Set To True if you want to cache data and use it for static generation
  // Set to false if statically generating pages, using ISR or tag-based revalidation
  //if you want to fetch new data without needed to refresh the page use Live Content API on Sanity
})
