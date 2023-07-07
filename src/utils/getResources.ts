import { Cheerio, Element } from 'cheerio';
import { Source, getSource } from './getSource.js';

export interface Resources {
  [key: string]: {
    count: number;
    sources: Source[];
  };
}

export function getResources(
  elements: Cheerio<Element>,
  url: string,
): Resources {
  const resourcesElements = elements.find(
    'link[rel="stylesheet"], script[src], img[src], video[src], audio[src], iframe[src], embed[src], object[src], source[src], track[src]',
  );

  const resources: Resources = {};

  for (const element of resourcesElements) {
    const tagName = element.tagName;
    const src = element.attribs['src'] || element.attribs['href'];

    if (!resources[tagName]) {
      resources[tagName] = {
        count: 1,
        sources: [getSource(src, url)],
      };
    } else {
      resources[tagName].count += 1;
      resources[tagName].sources.push(getSource(src, url));
    }
  }

  return resources;
}
