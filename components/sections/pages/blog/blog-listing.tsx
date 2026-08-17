/**
 * Blog Listing — Server Component wrapper.
 *
 * Fetches data at build time (SSG) and revalidates via ISR.
 * Passes the pre-fetched posts and category counts to the interactive
 * client component that handles search + filter.
 */

import { getAllBlogPosts, buildCategoryCounts } from "@/http/blog";
import { BlogListingClient } from "./blog-listing-client";

export async function BlogListing() {
  const posts = await getAllBlogPosts();
  const categoryCounts = buildCategoryCounts(posts);

  return <BlogListingClient posts={posts} categoryCounts={categoryCounts} />;
}
