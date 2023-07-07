import { Cheerio, Element } from 'cheerio';

interface CommonMeta {
  [key: string]: string;
}

export function getCommonMeta(elements: Cheerio<Element>): CommonMeta {
  const title =
    elements.find('title').text() ||
    elements.find('meta[property="og:title"]').attr('content') ||
    elements.find('meta[name="title"]').attr('content');

  const description =
    elements.find('meta[property="og:description"]').attr('content') ||
    elements.find('meta[name="description"]').attr('content');

  const url = elements.find('meta[property="og:url"]').attr('content');
  const site_name = elements
    .find('meta[property="og:site_name"]')
    .attr('content');

  const image =
    elements.find('meta[property="og:image"]').attr('content') ||
    elements.find('meta[property="og:image:url"]').attr('content');

  const icon =
    elements.find('link[rel="icon"]').attr('href') ||
    elements.find('link[rel="shortcut icon"]').attr('href');

  const keywords =
    elements.find('meta[property="og:keywords"]').attr('content') ||
    elements.find('meta[name="keywords"]').attr('content');

  return { title, description, url, site_name, image, icon, keywords };
}
