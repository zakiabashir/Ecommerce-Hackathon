import { createClient } from 'next-sanity'
import imageUrlBuilder from "@sanity/image-url";

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation

})



// Configure the image builder
const builder = imageUrlBuilder(client);

// Helper function to generate URLs
export function urlFor(source: any) {
  return builder.image(source).url();
}
