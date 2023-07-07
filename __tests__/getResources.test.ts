import { Resources, getResources } from '../src/utils/getResources.js';
import * as cheerio from 'cheerio';
import { getSource } from '../src/utils/getSource.js';

describe('getResources', () => {
  it('should return the correct resources', () => {
    const hostInternal = 'www.example.com';
    const hostExternal = 'www.otherexample.org';

    const html = `
      <html>
        <head>
          <title>Test Page</title>
          <link rel="stylesheet" href="/styles.css" />
          <script src="/script.js"></script>
          <img src="https://www.otherexample.org/image.jpg" />
          <video src="/video.mp4"></video>
          <audio src="https://www.otherexample.org/audio.mp3"></audio>
          <iframe src="/iframe.html"></iframe>
          <embed src="/embed.swf"></embed>
          <source src="/source.mp4" type="video/mp4" />
          <track src="/track.vtt" kind="subtitles" />
        </head>
        <body>
          <h1>Hello, world!</h1>
        </body>
      </html>
    `;

    const $ = cheerio.load(html);

    const expected: Resources = {
      link: {
        count: 1,
        sources: [{ path: '/styles.css', host: hostInternal }],
      },
      script: {
        count: 1,
        sources: [{ path: '/script.js', host: hostInternal }],
      },
      img: {
        count: 1,
        sources: [{ path: '/image.jpg', host: hostExternal }],
      },
      video: {
        count: 1,
        sources: [{ path: '/video.mp4', host: hostInternal }],
      },
      audio: {
        count: 1,
        sources: [{ path: '/audio.mp3', host: hostExternal }],
      },
      iframe: {
        count: 1,
        sources: [{ path: '/iframe.html', host: hostInternal }],
      },
      embed: {
        count: 1,
        sources: [{ path: '/embed.swf', host: hostInternal }],
      },
      source: {
        count: 1,
        sources: [{ path: '/source.mp4', host: hostInternal }],
      },
      track: {
        count: 1,
        sources: [{ path: '/track.vtt', host: hostInternal }],
      },
    };

    expect(getResources($('html'), 'http://www.example.com')).toEqual(expected);
  });
});

describe('getSource', () => {
  it('should return the correct source for an absolute URL', () => {
    const src = 'https://www.otherexample.com/image.jpg';
    const url = 'https://www.example.com';

    expect(getSource(src, url)).toEqual({
      host: 'www.otherexample.com',
      path: '/image.jpg',
    });
  });

  it('should return the correct source for a relative URL', () => {
    const src = '/image.jpg';
    const url = 'https://www.example.com';

    expect(getSource(src, url)).toEqual({
      host: 'www.example.com',
      path: '/image.jpg',
    });
  });
});
