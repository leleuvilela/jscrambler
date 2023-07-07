import * as cheerio from 'cheerio';
import { getTags } from '../src/utils/getTags.js';

describe('getTags', () => {
  it('should return the correct tags', () => {
    const html = `
      <html>
        <head>
          <title>Test Page</title>
          <link rel="stylesheet" href="/styles.css" />
          <script src="/script.js"></script>
        </head>
        <body>
          <h1>Hello, world!</h1>
          <p>This is a test page.</p>
        </body>
      </html>
    `;

    const $ = cheerio.load(html);

    const expected = {
      html: {
        count: 1,
        depth: 2,
        attributes: {},
        quantityChildrens: 2,
        childrens: {
          head: {
            count: 1,
            depth: 1,
            attributes: {},
            quantityChildrens: 2,
            childrens: {
              title: {
                count: 1,
                depth: 0,
                attributes: {},
                quantityChildrens: 0,
                childrens: {},
              },
              link: {
                count: 1,
                depth: 0,
                attributes: {
                  rel: {
                    count: 1,
                  },
                  href: {
                    count: 1,
                  },
                },
                quantityChildrens: 0,
                childrens: {},
              },
            },
          },
          body: {
            count: 1,
            depth: 1,
            attributes: {},
            quantityChildrens: 2,
            childrens: {
              h1: {
                count: 1,
                depth: 0,
                attributes: {},
                quantityChildrens: 0,
                childrens: {},
              },
              p: {
                count: 1,
                depth: 0,
                attributes: {},
                quantityChildrens: 0,
                childrens: {},
              },
            },
          },
        },
      },
    };

    expect(getTags($.root().children())).toEqual(expected);
  });
});
