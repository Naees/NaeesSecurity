export const site = {
  name: 'NaeesSecurity',
  author: 'Naees',
  headerName: 'NaeesWrites',
  blogName: 'NaeesWrites',
  tagline: 'Security research, writing, and notes from the edge cases.',
  description: 'Security research, field notes, and technical writing by Naees.',
  url: 'https://naees.github.io/NaeesSecurity',
  email: 'naees@protonmail.com',
  github: 'https://github.com/Naees',
  x: 'https://x.com/NaeesSecurity',
  signal: 'https://signal.me/#eu/1Fkdlvu4vmAqdT-5QwGdGFH1b4uOrLlpyMlK8Fyr5aw_eu6XMJ1PEYOH18jG1nMY',
  pgpFingerprint: 'EE03 DCB4 E594 D725 C528 83E0 4BCC B80F BFB5 EE54',
  focus: ['web security', 'identity', 'cloud exposure', 'practical exploitation'],
};

export const navLinks = [
  { href: '/', label: 'home' },
  // Research is intentionally hidden from the header until the section has real case files.
  // { href: '/research/', label: 'research' },
  { href: '/posts/', label: site.blogName },
  { href: '/about/', label: 'about' },
  { href: '/keys/', label: 'keys' },
];
