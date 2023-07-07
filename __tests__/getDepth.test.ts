import { getDepth } from '../src/utils/getDepth.js';
import * as cheerio from 'cheerio';

describe('getDepth', () => {
  it('should return the correct depth for a single tag', () => {
    const html = `
      <div>
      </div>
    `;

    const $ = cheerio.load(html);
    const tags = $('div');

    expect(getDepth(tags)).toEqual(1);
  });

  it('should return the correct depth for nested tags', () => {
    const html = `
    <div>
      <div>
        <span>
        </span>
      </div>
    </div>
    `;

    const $ = cheerio.load(html);
    const tags = $('div');

    expect(getDepth(tags)).toEqual(3);
  });

  it('should ignore non-tag nodes', () => {
    const html = `
      <span>
        Teste 123
      </span>
    `;

    const $ = cheerio.load(html);
    const tags = $('span');

    expect(getDepth(tags)).toEqual(1);
  });
});
