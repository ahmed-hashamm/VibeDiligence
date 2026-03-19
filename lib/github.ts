/**
 * @file github.ts
 * @description GitHub repository fetching for audit analysis.
 * Parses GitHub URLs, fetches file trees, and retrieves file contents.
 * All URLs are constructed from parsed values — never fetches raw user input (SSRF prevention).
 */

/** Priority file patterns to fetch for audit analysis. */
const AUDIT_PRIORITY: string[] = [
  'middleware.ts', 'middleware.js', '/auth/', 'auth.ts',
  '/api/', 'route.ts', 'route.js', 'actions.ts',
  '.sql', 'schema', '/supabase/', 'prisma',
  'next.config', '.env.example', 'package.json',
  'types/', '.types.ts',
];

/** File patterns to skip during fetching. */
const SKIP: string[] = [
  'node_modules', '.lock', 'dist/', '.next/',
  '.git/', '.png', '.jpg', '.svg', '.ico', '.woff',
];

/** Maximum number of files to fetch. */
const MAX_FILES = 30;

/** Maximum total characters across all fetched files. */
const MAX_CHARS = 48_000;

/** Strict regex for validating GitHub repository URLs. */
const GITHUB_URL_REGEX = /^https:\/\/github\.com\/([a-zA-Z0-9_.-]{1,100})\/([a-zA-Z0-9_.-]{1,100})\/?$/;

/** GitHub API base URL for SSRF verification. */
const GITHUB_API_BASE = 'https://api.github.com/';

/**
 * Parses and validates a GitHub repository URL.
 * @throws {Error} INVALID_URL if the URL does not match the expected format.
 */
export function parseGitHubUrl(url: string): { owner: string; repo: string } {
  const match = url.trim().match(GITHUB_URL_REGEX);
  if (!match) {
    throw new Error('INVALID_URL');
  }
  return { owner: match[1], repo: match[2] };
}

/** Represents a file entry from the GitHub tree API. */
interface GitHubTreeItem {
  path: string;
  type: string;
  url: string;
  size?: number;
}

/** Represents a file with its path and content. */
interface FetchedFile {
  path: string;
  content: string;
}

/**
 * Checks whether a file path matches any of the audit priority patterns.
 */
function isAuditRelevant(path: string): boolean {
  const lower = path.toLowerCase();
  return AUDIT_PRIORITY.some(pattern => lower.includes(pattern.toLowerCase()));
}

/**
 * Checks whether a file path should be skipped.
 */
function shouldSkip(path: string): boolean {
  const lower = path.toLowerCase();
  return SKIP.some(pattern => lower.includes(pattern.toLowerCase()));
}

/**
 * Fetches the repository tree from the GitHub API.
 * Tries `main` branch first, falls back to `master`.
 * @throws {Error} REPO_NOT_FOUND if the repository does not exist.
 * @throws {Error} REPO_PRIVATE if the repository is private.
 */
async function fetchTree(
  owner: string,
  repo: string,
  token: string
): Promise<GitHubTreeItem[]> {
  const branches = ['main', 'master'];

  for (const branch of branches) {
    const url = `${GITHUB_API_BASE}repos/${owner}/${repo}/git/trees/${branch}?recursive=1`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'VibeDiligence-Audit/1.0',
      },
    });

    if (res.ok) {
      const data = await res.json() as { tree: GitHubTreeItem[] };
      return data.tree;
    }

    if (res.status === 404 && branch === 'main') {
      continue; // Try master
    }
    if (res.status === 404) {
      throw new Error('REPO_NOT_FOUND');
    }
    if (res.status === 403) {
      throw new Error('REPO_PRIVATE');
    }

    throw new Error('REPO_NOT_FOUND');
  }

  throw new Error('REPO_NOT_FOUND');
}

/**
 * Fetches the content of a single file blob from the GitHub API.
 * Verifies the blob URL starts with the GitHub API base before fetching (SSRF prevention).
 */
async function fetchBlobContent(blobUrl: string, token: string): Promise<string> {
  // SSRF prevention: verify URL belongs to GitHub API
  if (!blobUrl.startsWith(GITHUB_API_BASE)) {
    return '';
  }

  const res = await fetch(blobUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'VibeDiligence-Audit/1.0',
    },
  });

  if (!res.ok) return '';

  const data = await res.json() as { content?: string; encoding?: string };

  if (data.encoding === 'base64' && data.content) {
    try {
      return Buffer.from(data.content, 'base64').toString('utf-8');
    } catch {
      return '';
    }
  }

  return '';
}

/**
 * Fetches relevant files from a public GitHub repository for audit analysis.
 * 
 * Flow:
 * 1. Parse owner/repo from URL
 * 2. Fetch file tree (main → master fallback)
 * 3. Filter for audit-relevant files, skip irrelevant ones
 * 4. Fetch up to MAX_FILES files, capped at MAX_CHARS total
 * 5. Return concatenated file contents
 * 
 * @throws {Error} INVALID_URL — URL does not match expected format
 * @throws {Error} REPO_NOT_FOUND — repository does not exist
 * @throws {Error} REPO_PRIVATE — repository is private (403)
 * @throws {Error} REPO_EMPTY — no audit-relevant files found
 */
export async function fetchRepoFiles(url: string): Promise<string> {
  const { owner, repo } = parseGitHubUrl(url);
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    throw new Error('INTERNAL_ERROR');
  }

  const tree = await fetchTree(owner, repo, token);

  // Filter to relevant blob files only
  const relevantFiles = tree
    .filter(item => item.type === 'blob' && !shouldSkip(item.path))
    .filter(item => isAuditRelevant(item.path))
    .slice(0, MAX_FILES);

  if (relevantFiles.length === 0) {
    throw new Error('REPO_EMPTY');
  }

  const fetchedFiles: FetchedFile[] = [];
  let totalChars = 0;

  for (const file of relevantFiles) {
    if (totalChars >= MAX_CHARS) break;

    const content = await fetchBlobContent(file.url, token);
    if (!content) continue;

    const trimmed = content.slice(0, MAX_CHARS - totalChars);
    fetchedFiles.push({ path: file.path, content: trimmed });
    totalChars += trimmed.length;
  }

  if (fetchedFiles.length === 0) {
    throw new Error('REPO_EMPTY');
  }

  // Format as labeled file contents
  return fetchedFiles
    .map(f => `--- ${f.path} ---\n${f.content}`)
    .join('\n\n');
}
