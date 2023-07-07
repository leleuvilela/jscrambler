import { ChildNode } from 'domhandler';
import { Cheerio, Element } from 'cheerio';

export function getDepth(tags: ChildNode[] | Cheerio<Element>): number {
  let depth = 0;

  for (const tag of tags) {
    if (tag.type !== 'tag') {
      continue;
    }

    const currentDepth = getDepth(tag.children) + 1;

    if (currentDepth > depth) {
      depth = currentDepth;
    }
  }

  return depth;
}
