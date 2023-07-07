import axios from 'axios';
import * as cheerio from 'cheerio';
import { getMeta } from '../src/commands/getMeta.js';
import * as getTags from '../src/utils/getTags.js';
import * as getCommonMeta from '../src/utils/getCommonMeta.js';
import * as getResources from '../src/utils/getResources.js';
import * as fs from 'fs';

jest.mock('axios');

const data = '<html><head></head><body></body></html>';

describe('getMeta', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();

    axios.get = jest.fn().mockResolvedValue({ data });
  });

  it('should call axios.get() with the correct URL', async () => {
    const url = 'https://www.example.com';
    const options = { save: false };

    await getMeta(url, options);

    expect(axios.get).toHaveBeenCalledWith(url);
  });

  it('should return a error message if axios.get() fails', async () => {
    const url = 'httpsd://www.example.com';
    const options = { save: false };

    const error = new Error('Failed to fetch url.');
    axios.get = jest.fn().mockRejectedValue(error);

    const spy = jest.spyOn(console, 'error');

    await getMeta(url, options);

    expect(spy).toHaveBeenCalledWith(error);

    spy.mockRestore();
  });

  it('should call cheerio.load() with the correct data', async () => {
    const url = 'https://www.example.com';
    const options = { save: false };

    const spy = jest.spyOn(cheerio, 'load');

    await getMeta(url, options);

    expect(spy).toHaveBeenCalledWith(data);

    spy.mockRestore();
  });

  it('should save file if options.save is true', async () => {
    const url = 'https://www.example.com';
    const options = { save: true };

    const spy = jest.spyOn(fs, 'writeFileSync');

    await getMeta(url, options);

    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });

  it('should call getTags() with the correct data', async () => {
    const url = 'https://www.example.com';
    const options = { save: false };

    const spy = jest.spyOn(getTags, 'getTags');

    await getMeta(url, options);

    expect(spy).toHaveBeenCalledWith(expect.any(Object));

    spy.mockRestore();
  });

  it('should call getCommonMeta() with the correct data', async () => {
    const url = 'https://www.example.com';
    const options = { save: false };

    const spy = jest.spyOn(getCommonMeta, 'getCommonMeta');

    await getMeta(url, options);

    expect(spy).toHaveBeenCalledWith(expect.any(Object));

    spy.mockRestore();
  });

  it('should call getResources() with the correct data', async () => {
    const url = 'https://www.example.com';
    const options = { save: false };

    const spy = jest.spyOn(getResources, 'getResources');

    await getMeta(url, options);

    expect(spy).toHaveBeenCalledWith(expect.any(Object), url);

    spy.mockRestore();
  });
});
