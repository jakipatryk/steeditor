import { withAuthor } from './withAuthor';

fdescribe('#core #steemize withAuthor', () => {
  const author = 'jakipatryk';

  it('should return an object with a correct `author` property', () => {
    const result = withAuthor(author)({});

    expect(result.author).toBe('jakipatryk');
  });

  it('should NOT mutate the original `target` object', () => {
    const target = {
      title: 'any'
    };

    withAuthor(author)(target);

    expect(target).toEqual({
      title: 'any'
    });
  });
});
