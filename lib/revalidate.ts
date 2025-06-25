import { revalidateTag } from 'next/cache';

const tags = ['text', 'experience', 'projects', 'skills'];

export async function revalidateAllTags() {
  for (const tag of tags) {
    await revalidateTag(tag);
  }
  return tags;
}
