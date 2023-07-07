import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import { getTags } from '../utils/getTags.js';
import { getCommonMeta } from '../utils/getCommonMeta.js';
import { getResources } from '../utils/getResources.js';

interface getMetaOptions {
  save: boolean;
}

export async function getMeta(
  url: string,
  options: getMetaOptions,
): Promise<void> {
  try {
    const result = await axios.get(url);
    const $ = cheerio.load(result.data);

    const html = $.root().children();

    const tags = getTags(html);
    const commonMeta = getCommonMeta($('head'));
    const resources = getResources($('html'), url);

    console.log(JSON.stringify({ tags, commonMeta, resources }, null, 2));

    if (options.save) {
      const path = process.cwd() + '/meta.json';
      fs.writeFileSync(
        path,
        JSON.stringify({ tags, commonMeta, resources }, null, 2),
      );

      console.log(`Saved to ${path}`);
    }
  } catch (error) {
    console.error(new Error('Failed to fetch url.'));
  }
}
