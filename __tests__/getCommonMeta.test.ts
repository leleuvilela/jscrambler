import { getCommonMeta } from '../src/utils/getCommonMeta.js';
import * as cheerio from 'cheerio';

describe('getCommonMeta', () => {
  it('should return the correct meta data', () => {
    const html = `
      <html>
        <head>
          <title>Test Page</title>
          <meta property="og:title" content="Open Graph Title" />
          <meta name="description" content="Test Description" />
          <meta property="og:url" content="https://www.example.com" />
          <meta property="og:site_name" content="Example Site" />
          <meta property="og:image" content="https://www.example.com/image.jpg" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="keywords" content="test, keywords" />
        </head>
        <body>
          <h1>Hello, world!</h1>
        </body>
      </html>
    `;

    const $ = cheerio.load(html);

    const expected = {
      title: 'Test Page',
      description: 'Test Description',
      url: 'https://www.example.com',
      site_name: 'Example Site',
      image: 'https://www.example.com/image.jpg',
      icon: '/favicon.ico',
      keywords: 'test, keywords',
    };

    expect(getCommonMeta($('head'))).toEqual(expected);
  });
});
