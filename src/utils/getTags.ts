import { ChildNode } from 'domhandler';
import { getDepth } from './getDepth.js';
import { Cheerio, Element } from 'cheerio';

export interface Tags {
  [key: string]: {
    count: number;
    depth?: number;
    attributes?: {
      [key: string]: {
        count: number;
      };
    };
    quantityChildrens?: number;
    childrens?: Tags;
  };
}

export function getTags(elements: ChildNode[] | Cheerio<Element>): Tags {
  const tags: Tags = {};

  for (const element of elements) {
    if (element.type !== 'tag') {
      continue;
    }

    const tagName = element.tagName;

    if (!tags[tagName]) {
      tags[tagName] = {
        count: 1,
        depth: getDepth(element.children),
        attributes: {},
        quantityChildrens: element.children.filter(
          (child) => child.type === 'tag',
        ).length,
        childrens: getTags(element.children),
      };
    } else {
      tags[tagName].count += 1;
      tags[tagName].quantityChildrens += element.children.length;
    }

    for (const attribute of element.attributes) {
      const attributeName = attribute.name;

      if (!tags[tagName].attributes[attributeName]) {
        tags[tagName].attributes[attributeName] = {
          count: 1,
        };
      } else {
        tags[tagName].attributes[attributeName].count += 1;
      }
    }
  }

  return tags;
}
