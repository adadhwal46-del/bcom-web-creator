import { describe, expect, it } from 'vitest';
import { prepareEmail } from '@/lib/portfolio';

describe('Contact email preparation', () => {
  it('prepares a draft for the approved sample student without submitting it', () => {
    const draft = prepareEmail('Sam Lee', 'sam@example.com', 'Student project & research', 'Could we collaborate on business research?');
    expect(draft.split('?')[0]).toBe('mailto:alex.morgan@example.com');
    const params = new URLSearchParams(draft.split('?')[1]);
    expect(params.get('subject')).toBe('Student project & research');
    expect(params.get('body')).toBe('Hello Alex,\n\nCould we collaborate on business research?\n\nFrom: Sam Lee\nEmail: sam@example.com');
  });
});