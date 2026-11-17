import { describe, expect, it } from 'vitest';
import { toPublicRepositories } from '@/lib/github-repositories';

describe('public GitHub repositories', () => {
  it('keeps only public repositories and exposes a safe, limited display shape', () => {
    const repositories = toPublicRepositories([
      {
        id: 12,
        name: 'my-site',
        private: false,
        description: null,
        html_url: 'https://github.com/adadhwal46-del/my-site',
        language: 'TypeScript',
        stargazers_count: 2,
        forks_count: 1,
        updated_at: '2026-11-17T10:04:35Z',
        owner: { login: 'should-not-be-exposed' },
      },
      { id: 13, name: 'private-work', private: true },
    ]);

    expect(repositories).toEqual([{
      id: 12,
      name: 'my-site',
      description: null,
      url: 'https://github.com/adadhwal46-del/my-site',
      language: 'TypeScript',
      stars: 2,
      forks: 1,
      updatedAt: '2026-11-17T10:04:35Z',
    }]);
  });
});