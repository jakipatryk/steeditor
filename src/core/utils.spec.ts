import { getMatchesByGroup, isJsonValid } from './utils';

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

fdescribe('#core #utils isJsonValid', () => {
  it('should return false if string is empty', () => {
    const result = isJsonValid('');

    expect(result).toBeFalsy();
  });

  it('should return false if string is NOT stringified JSON', () => {
    const result = isJsonValid('abcdef');

    expect(result).toBeFalsy();
  });

  it('should return true if string is valid stringified JSON', () => {
    const result = isJsonValid('{"prop1":"value1", "prop2": ["val2","val3"]}');

    expect(result).toBeTruthy();
  });
});
