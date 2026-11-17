export type PublicRepository = {
  id: number;
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  forks: number;
  updatedAt: string;
};

export function toPublicRepositories(payload: unknown): PublicRepository[] {
  if (!Array.isArray(payload)) return [];

  return payload.flatMap((item): PublicRepository[] => {
    if (typeof item !== 'object' || item === null) return [];

    const repository = item as Record<string, unknown>;
    if (repository.private !== false || typeof repository.name !== 'string' || !repository.name) return [];

    const name = repository.name;
    return [{
      id: typeof repository.id === 'number' ? repository.id : name.length,
      name,
      description: typeof repository.description === 'string' ? repository.description : null,
      url: `https://github.com/adadhwal46-del/${encodeURIComponent(name)}`,
      language: typeof repository.language === 'string' ? repository.language : null,
      stars: typeof repository.stargazers_count === 'number' ? repository.stargazers_count : 0,
      forks: typeof repository.forks_count === 'number' ? repository.forks_count : 0,
      updatedAt: typeof repository.updated_at === 'string' ? repository.updated_at : '',
    }];
  });
}