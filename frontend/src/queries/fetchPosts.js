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

const formatHtml = html => {
  // add target="_blank" to all links
  let formatted = html;
  formatted = formatted?.replace(/<a/g, `<a target="_blank"`);
  // remove all <hr /> tags
  formatted = formatted?.replace(/<hr\s*\/?>/g, "");
  return formatted;

}

export const fetchPostBySlug = (slug) => async () => {
  let post = await api.posts.read({ slug }, { include: "tags,authors" });
  post.formattedHtml = await formatHtml(post.html);
  return post;
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
