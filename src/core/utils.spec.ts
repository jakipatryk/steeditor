import { getMatchesByGroup } from './utils';

fdescribe('#core #utils getMatches', () => {
  const text = 'abc abc abc ttttabctttt';

  it('should extract matches of a given group and return them', () => {
    const matches = getMatchesByGroup(/a(bc)/g, 1, text);

    expect(matches).toEqual(['bc', 'bc', 'bc', 'bc']);
  });

  it('should return an empty array if there are no matches', () => {
    const matches = getMatchesByGroup(/a(ge)/g, 1, text);

    expect(matches).toEqual([]);
  });
});
