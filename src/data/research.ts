export type CaseStatus = 'Active' | 'Analysis' | 'Closed';
export type CaseSurface = 'Web' | 'Identity' | 'Cloud';

export interface ResearchCase {
  slug: string;
  id: string;
  subject: string;
  surface: CaseSurface;
  status: CaseStatus;
  updated: string;
  tags: string[];
  summary: string;
  takeaway: string;
  signals: string[];
  remediation: string[];
  disclosure: string;
}

export const researchCases: ResearchCase[] = [
  {
    slug: 'cloud-storage-exposure',
    id: 'CASE-NS-0007',
    subject: 'Cloud exposure: misconfigured object storage',
    surface: 'Cloud',
    status: 'Active',
    updated: '2026-07-05',
    tags: ['cloud', 's3', 'misconfig', 'recon'],
    summary: 'Anonymous object reads exposed sensitive files because an ACL and bucket policy drifted away from the intended private posture.',
    takeaway: 'Storage exposure usually appears as policy drift, not a dramatic exploit. Inventory, ownership, and least-privilege checks catch it early.',
    signals: ['Public object listing or predictable object URLs', 'Sensitive names in object keys or metadata', 'Bucket policy exceptions without an owner'],
    remediation: ['Default buckets to private and block public access', 'Continuously lint ACLs and resource policies', 'Review object naming and retention for sensitive data'],
    disclosure: 'Sanitized case note. Target identifiers and artifacts are withheld until disclosure constraints allow more detail.',
  },
  {
    slug: 'ssrf-metadata-iam-disclosure',
    id: 'CASE-NS-0006',
    subject: 'SSRF to internal metadata: IAM key disclosure',
    surface: 'Web',
    status: 'Analysis',
    updated: '2026-06-28',
    tags: ['ssrf', 'aws', 'metadata', 'iam'],
    summary: 'An image fetch workflow accepted attacker-controlled URLs and could be chained to internal metadata access under specific network conditions.',
    takeaway: 'SSRF risk is highest when a low-trust fetcher can reach high-trust metadata, admin, or control-plane services.',
    signals: ['URL fetchers with broad protocol or host support', 'No egress allowlist for internal address ranges', 'Metadata service reachable from application runtime'],
    remediation: ['Use strict URL parsing and destination allowlists', 'Block link-local and private network egress by default', 'Require metadata protections such as IMDSv2 and narrow IAM roles'],
    disclosure: 'High-level analysis only. PoC details are intentionally omitted.',
  },
  {
    slug: 'oauth-token-redirect-misuse',
    id: 'CASE-NS-0005',
    subject: 'OAuth misuse in the wild: token exfil via redirect',
    surface: 'Identity',
    status: 'Closed',
    updated: '2026-06-14',
    tags: ['oauth', 'redirect', 'token', 'idp'],
    summary: 'Multiple clients accepted tokens without strict audience or issuer validation, making redirect and token-confusion paths easier to exploit.',
    takeaway: 'Identity bugs often come from trusting the shape of a token instead of validating who issued it, who it is for, and how it arrived.',
    signals: ['Loose redirect allowlists', 'Missing audience or issuer checks', 'Tokens accepted across clients or environments'],
    remediation: ['Validate issuer, audience, nonce, and token type', 'Use exact redirect URI matching', 'Separate test and production clients and secrets'],
    disclosure: 'Closed note. Details are generalized to avoid identifying affected applications.',
  },
  {
    slug: 'idor-multi-tenant-reporting-api',
    id: 'CASE-NS-0004',
    subject: 'IDOR in multi-tenant reporting API',
    surface: 'Web',
    status: 'Closed',
    updated: '2026-06-01',
    tags: ['idor', 'api', 'multi-tenant'],
    summary: 'Tenant boundaries depended on client-selected report identifiers rather than server-side ownership checks.',
    takeaway: 'Multi-tenant APIs need authorization decisions on every object access, not just at navigation or query construction time.',
    signals: ['Sequential or guessable object identifiers', 'Report exports fetched by ID only', 'Different tenants sharing the same API shape'],
    remediation: ['Enforce object ownership server-side', 'Add negative authorization tests for every object route', 'Log and alert cross-tenant access attempts'],
    disclosure: 'Closed and anonymized case note.',
  },
  {
    slug: 'role-confusion-privilege-escalation',
    id: 'CASE-NS-0003',
    subject: 'Privilege escalation via role confusion',
    surface: 'Identity',
    status: 'Analysis',
    updated: '2026-05-22',
    tags: ['rbac', 'role', 'authz', 'graph'],
    summary: 'Role inheritance drift created unintended administrative actions in a delegated workflow.',
    takeaway: 'Authorization graphs become fragile when roles describe people, workflows, and resource privileges at the same time.',
    signals: ['Nested roles with unclear ownership', 'Delegated admin flows that skip resource checks', 'Permission names reused across products or tenants'],
    remediation: ['Model resource actions explicitly', 'Test inherited roles with least-privilege fixtures', 'Review delegated workflows after organization changes'],
    disclosure: 'Analysis note. Validation is ongoing.',
  },
  {
    slug: 'graphql-introspection-production',
    id: 'CASE-NS-0002',
    subject: 'GraphQL introspection in production',
    surface: 'Web',
    status: 'Closed',
    updated: '2026-05-10',
    tags: ['graphql', 'introspection', 'infoleak'],
    summary: 'Production schema exposure simplified object discovery and query construction for unauthenticated users.',
    takeaway: 'Introspection is not always a vulnerability by itself, but it can shorten the path from curiosity to exploitability.',
    signals: ['Unauthenticated schema discovery', 'Verbose field names or hidden administrative types', 'Error messages leaking resolver behavior'],
    remediation: ['Disable public introspection unless intentionally documented', 'Apply authorization at resolver level', 'Harden error handling and rate limits'],
    disclosure: 'Closed and generalized note.',
  },
  {
    slug: 'open-redirect-token-exfiltration',
    id: 'CASE-NS-0001',
    subject: 'Open redirect → token exfiltration',
    surface: 'Web',
    status: 'Closed',
    updated: '2026-04-30',
    tags: ['redirect', 'phishing', 'token'],
    summary: 'A redirect allowlist bypass enabled credential-flow token leakage under specific client settings.',
    takeaway: 'Redirect bugs become materially worse when identity flows place tokens or codes near attacker-controlled destinations.',
    signals: ['Wildcard redirect allowlists', 'URL normalization differences', 'OAuth flows sharing redirect handlers with marketing links'],
    remediation: ['Use exact redirect destinations for identity flows', 'Normalize and compare URLs before redirecting', 'Keep tokens out of fragments or URLs when possible'],
    disclosure: 'Closed and anonymized case note.',
  },
];

export const featuredCases = researchCases.slice(0, 3);
export const caseFilters = ['All cases', 'Web', 'Identity', 'Cloud', 'Exploitation'] as const;

export function getResearchCase(slug: string) {
  return researchCases.find((item) => item.slug === slug);
}
