import { GHOST_CONTENT_API_URL, GHOST_CONTENT_API_KEY } from "../environment";

import GhostContentAPI from "@tryghost/content-api";

const api = new GhostContentAPI({
  url: GHOST_CONTENT_API_URL,
  key: GHOST_CONTENT_API_KEY,
  version: "v3",
});

export async function fetchPosts() {
  return api.posts.browse({ limit: 100, include: "tags,authors" });
}

export const fetchPostBySlug = (slug) => async () => {
  return api.posts.read({ slug }, { include: "tags,authors" });
};

export const fetchSlugOfNextPost = (slug) => async () => {
  // slugs are listed in reverse chronological order
  const slugs = await api.posts.browse({ limit: 100, fields: "slug" });
  const nextSlug = slugs.find((s, i, a) => a[i + 1] && a[i + 1].slug === slug);
  return nextSlug.slug
}

export const fetchSlugOfPrevPost = (slug) => async () => {
  // slugs are listed in reverse chronological order
  const slugs = await api.posts.browse({ limit: 100, fields: "slug" });
  const nextSlug = slugs.find((s, i, a) => a[i - 1] && a[i - 1].slug === slug);
  return nextSlug.slug
}
