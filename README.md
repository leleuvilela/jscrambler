# Jscrambler CLI

A CLI tool to get metas from a URL.

## Installation

```bash
npm install
npm run build
```

## Usage

```bash
npm start <string> [--save]
```

## Options

- `<string>`: URL to be analyzed.
- `--save`: Save JSON to a file.

## Example

```bash
npm start https://facebook.com --save
```

This will output the meta information for the specified URL and save it to a file `.meta.json` (if the `--save` option is used).

## Global Instalation

You can link the package globally for use in any directory:

```bash
npm link
```

Now you can use in another directory the command:

```bash
jscrambler https://facebook.com --save
```
