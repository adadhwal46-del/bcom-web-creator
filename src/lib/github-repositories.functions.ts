import { createServerFn } from '@tanstack/react-start';
import { toPublicRepositories } from '@/lib/github-repositories';

export const getPublicRepositories = createServerFn({ method: 'GET' }).handler(async () => {
  const lovableApiKey = process.env['LOVABLE_API_KEY'];
  const githubApiKey = process.env['GITHUB_API_KEY'];

  if (!lovableApiKey || !githubApiKey) {
    console.error('GitHub repositories are unavailable: connected credentials are missing.');
    return { repositories: [], unavailable: true };
  }

  const url = new URL('https://connector-gateway.lovable.dev/github/user/repos');
  url.search = new URLSearchParams({
    visibility: 'public',
    affiliation: 'owner',
    sort: 'updated',
    direction: 'desc',
    per_page: '100',
  }).toString();

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${lovableApiKey}`,
        'X-Connection-Api-Key': githubApiKey,
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`GitHub repository request failed [${response.status}]: ${errorBody}`);
      return { repositories: [], unavailable: true };
    }

    const repositories = toPublicRepositories(await response.json());
    return { repositories, unavailable: false };
  } catch (error) {
    console.error('GitHub repository request failed:', error);
    return { repositories: [], unavailable: true };
  }
});