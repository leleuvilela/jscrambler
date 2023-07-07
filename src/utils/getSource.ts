export interface Source {
  host: string;
  path: string;
}

export function getSource(src: string, url: string): Source {
  if (src.startsWith('http')) {
    const { host, pathname } = new URL(src);
    return { host, path: pathname };
  }

  return {
    host: new URL(url).host,
    path: src,
  };
}
