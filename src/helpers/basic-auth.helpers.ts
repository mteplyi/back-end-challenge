interface CredentialData {
  name: string;
  password: string;
}

type Token = string;
type Header = string;

export function encodeCredentials({ name, password }: CredentialData): Token {
  const buffer = new Buffer(`${name}:${password}`);
  return buffer.toString('base64');
}

export function extractBasicToken(header: Header): Token | null {
  const headerMatch = header.match(/^Basic (.+)$/);
  if (!headerMatch || !headerMatch[1]) {
    return null;
  }
  return headerMatch[1];
}

export function decodeCredentials(token: Token): CredentialData | null {
  const buffer = new Buffer(token, 'base64');
  const [name, password] = buffer.toString().split(':');
  if (!name || !password) {
    return null;
  }
  return { name, password };
}
