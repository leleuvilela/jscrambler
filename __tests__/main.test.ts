import { Command } from 'commander';
import { main } from '../src/main.js';
import { getMeta } from '../src/commands/getMeta.js';

jest.mock('commander');

describe('main', () => {
  it('should call program.parse()', () => {
    const program = new Command();

    main(program);

    expect(program.name).toHaveBeenCalledWith('jscrambler');
    expect(program.description).toHaveBeenCalledWith(
      'CLI to get metas from a URL',
    );
    expect(program.version).toHaveBeenCalledWith('1.0.0');
    expect(program.argument).toHaveBeenCalledWith(
      '<url>',
      'URL to be analyzed',
    );
    expect(program.option).toHaveBeenCalledWith(
      '--save',
      'save JSON to a file',
    );
    expect(program.action).toHaveBeenCalledWith(getMeta);
  });
});
