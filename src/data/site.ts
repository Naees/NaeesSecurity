export const site = {
  name: 'NaeesSecurity',
  author: 'Naees',
  headerName: 'NaeesSecurity',
  blogName: 'NaeesWrites',
  tagline: 'We exploit the unseen.',
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
  { href: '/engagements/', label: 'engagements' },
  { href: '/about/', label: 'about' },
  { href: '/contact/', label: 'contact' },
];

export interface FooterLink {
  href: string;
  label: string;
  external?: boolean;
}

export interface FooterGroup {
  label: string;
  links: FooterLink[];
}

const external = (href: string, label: string): FooterLink => ({ href, label, external: true });
const internal = (href: string, label: string): FooterLink => ({ href, label });

export const issueUrl = 'https://github.com/Naees/NaeesSecurity/issues/new?title=Site%20issue%3A%20&body=Page%3A%0A%0AIssue%3A%0A%0AExpected%20behavior%3A%0A%0ABrowser%2Fdevice%3A';

export function getFooterGroups(base: string, isBlog: boolean): FooterGroup[] {
  if (isBlog) {
    return [
      {
        label: 'Read',
        links: [
          internal(`${base}posts/`, 'All posts'),
          internal(`${base}rss.xml`, 'RSS'),
        ],
      },
      {
        label: 'Socials & Main Site',
        links: [
          internal(base, site.name),
          external(site.github, 'GitHub'),
          external(site.x, 'X / Twitter'),
        ],
      },
      {
        label: 'Contact',
        links: [
          internal(`mailto:${site.email}`, site.email),
          external(site.signal, 'Signal'),
          internal(`${base}keys/publickey.naees.asc`, 'PGP'),
          external(issueUrl, 'Report issue'),
        ],
      },
    ];
  }

  return [
    {
      label: 'Verify',
      links: [internal(`${base}keys/`, 'Fingerprint')],
    },
    {
      label: 'Socials & Blog',
      links: [
        internal(`${base}posts/`, site.blogName),
        external(site.github, 'GitHub'),
        external(site.x, 'X / Twitter'),
      ],
    },
    {
      label: 'Contact',
      links: [
        internal(`mailto:${site.email}`, site.email),
        external(site.signal, 'Signal'),
        internal(`${base}keys/publickey.naees.asc`, 'PGP key'),
        external(issueUrl, 'Report issue'),
      ],
    },
  ];
}

export const tagTaxonomy = [
  'security',
  'web-security',
  'identity',
  'cloud-security',
  'vulnerability-research',
  'secure-contact',
  'pgp',
  'contact',
  'field-notes',
  'method',
  'methodology',
  'site',
  'site-notes',
  'design',
  'writing',
  'pink'
] as const;

export const tagGuidelines = {
  min: 3,
  max: 5,
  source: 'Use the controlled tagTaxonomy list unless a post clearly needs a new recurring category.',
  rules: [
    'Prefer specific technical tags over broad tags.',
    'Use field-notes for short research/process notes.',
    'Use site-notes only for posts about this website or publishing workflow.',
    'Do not add one-off tags that are unlikely to be reused.',
    'Keep tags lowercase kebab-case.',
  ],
};
