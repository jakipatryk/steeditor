import {
  getFormat,
  getUsers,
  withApp,
  withFormat,
  withTags,
  withUsers,
  getImages,
  getLinks,
  withImage,
  withLinks,
  withJsonMetadata,
  createJsonMetadata,
  withCommunity
} from './withJsonMetadata';
import { SteeditorPost } from '../SteeditorPost';

fdescribe('#core #steemize (json_metadata) withApp', () => {
  it('should return an object with `app` property which contains `steeditor`', () => {
    const result = withApp({});

    expect(result.app).toContain('steeditor');
  });
});

fdescribe('#core #steemize (json_metadata) withTags', () => {
  it('should return an object with `tags` property which is an array of unique strings', () => {
    const tags = ['tag1', 'tag2', 'tag3', 'tag1'];

    const result = withTags(tags)({});

    expect(result.tags).toContain('tag1');
    expect(result.tags).toContain('tag2');
    expect(result.tags).toContain('tag2');
    expect(result.tags.length).toBe(3);
  });

  it('should set `tags` to an empty array if provided `tags` array is empty', () => {
    const tags = [];

    const result = withTags(tags)({});

    expect(result.tags).toEqual([]);
  });
});

fdescribe('#core #steemize (json_metadata) getUsers', () => {
  it('should extract users (mentions) from string and return matches in an array', () => {
    const oneLineBody =
      'anything @jakipatryk@jakipatryk-dev anything fdsfdsfds@strimi (@nakamoto)';
    const multiLineBody = `testing @jakipatryk
    @jakipatryk-dev anything dfjsnfjdsfnjs@strimi.
    (@nakamoto).`;

    const usersOneLine = getUsers(oneLineBody);
    const usersMultiLine = getUsers(multiLineBody);

    expect(usersOneLine).toEqual([
      'jakipatryk',
      'jakipatryk-dev',
      'strimi',
      'nakamoto'
    ]);
    expect(usersMultiLine).toEqual([
      'jakipatryk',
      'jakipatryk-dev',
      'strimi',
      'nakamoto'
    ]);
  });

  it('should return only unique matches', () => {
    const oneLineBody =
      'anything @jakipatryk@jakipatryk-dev anything @jakipatryk fdsfdsfds@strimi (@nakamoto)';
    const multiLineBody = `testing @jakipatryk
    @jakipatryk-dev anything dfjsnfjdsfnjs@strimi.
    (@nakamoto). @jakipatryk @jakipatryk`;

    const usersOneLine = getUsers(oneLineBody);
    const usersMultiLine = getUsers(multiLineBody);

    expect(usersOneLine).toEqual([
      'jakipatryk',
      'jakipatryk-dev',
      'strimi',
      'nakamoto'
    ]);
    expect(usersMultiLine).toEqual([
      'jakipatryk',
      'jakipatryk-dev',
      'strimi',
      'nakamoto'
    ]);
  });

  it('should return an empty array if there are no matches', () => {
    const oneLineBody = 'anything test123 (())(()()()()() @@@ @ test';
    const multiLineBody = `testing
    bla bla ())()()()(@@
      @@  22323`;

    const usersOneLine = getUsers(oneLineBody);
    const usersMultiLine = getUsers(multiLineBody);

    expect(usersOneLine).toEqual([]);
    expect(usersMultiLine).toEqual([]);
  });
});

fdescribe('#core #steemize (json_metadata) withUsers', () => {
  it('should return an object with `users` property which is an array of unique strings', () => {
    const body = 'anything';

    const result = withUsers(body)({});

    expect(result.users).toBeDefined();
  });
});

fdescribe('#core #steemize (json_metadata) getFormat', () => {
  it('should return `html` if body starts with <html> and ends with </html>', () => {
    const htmlBody = `<html>
    <p> this is test!</p>
    [Markdown should work too!](https://steeditor.app/)
    </html>`;

    const format = getFormat(htmlBody);

    expect(format).toBe('html');
  });

  it('should return `markdown` if body DOES NOT start with <html> and DOES NOT end with </html>', () => {
    const markdownBody = `[Markdown should work here!](https://steeditor.app/)
    <p>but HTML should work either!</p>
    this weird mixin is still considered a Markdown tho :(`;

    const format = getFormat(markdownBody);

    expect(format).toBe('markdown');
  });
});

fdescribe('#core #steemize (json_metadata) withFormat', () => {
  it('should return an object with `format` property', () => {
    const body = 'anything';

    const result = withFormat(body)({});

    expect(result.format).toBeDefined();
  });
});

fdescribe('#core #steemize (json_metadata) getImages', () => {
  it('should extract and return an array of links to images if there are any correctly formatted with Markdown', () => {
    const body = `![Markdown is the best!](https://steeditor.app/images/amazing_image)
    <p>test</p>
    ![NICE IMAGE](https://steeditor.app/images/nice_image)this weird mixin is still considered a Markdown tho :(`;

    const images = getImages(body);

    expect(images).toEqual([
      'https://steeditor.app/images/amazing_image',
      'https://steeditor.app/images/nice_image'
    ]);
  });

  it('should ignore markdown links (`[]()` syntax)', () => {
    const body = `![Markdown is the best!](https://steeditor.app/images/amazing_image)
    <p>test</p>
    [NICELINK](https://steeditor.app/)

    ![NICE IMAGE](https://steeditor.app/images/nice_image)this weird mixin is still considered a Markdown tho :(`;

    const images = getImages(body);

    expect(images).not.toContain('https://steeditor.app/');
  });

  it('should return an empty array if there are no images or they are not formatted with Markdown', () => {
    const body = `<img src="https://steeditor.app/images/amazing_image" />
    <p>I dont like HTML in Steem posts...</p>
    https://steeditor.app/images/nice_image this weird mixin is still considered a Markdown tho :(`;

    const images = getImages(body);

    expect(images).toEqual([]);
  });
});

fdescribe('#core #steemize (json_metadata) withImage', () => {
  it('should return an object with `image` property', () => {
    const body = 'anything';

    const result = withImage(body)({});

    expect(result.image).toBeDefined();
  });

  it('should return an object with `image` array with `thumbnail` as a first element if provided', () => {
    const body = 'anything ![](https://amazing-image.cot/)';
    const thumbnail = 'https://super-image.cot/';

    const result = withImage(body, thumbnail)({});

    expect(result.image[0]).toBe('https://super-image.cot/');
  });

  it('should NOT prepend thumbnail if it is an empty string', () => {
    const body = 'anything ![](https://amazing-image.cot/)';
    const thumbnail = '';

    const result = withImage(body, thumbnail)({});

    expect(result.image[0]).not.toBe('');
  });
});

fdescribe('#core #steemize (json_metadata) getLinks', () => {
  it('should extract and return an array of unique links if there are any', () => {
    const body = `[Markdown is the best!](https://steeditor.app/)
    https://utopian.io,
    <a href="https://github.com/jakipatryk/steeditor/pull/82">TEST</a>
    <p>test</p> (https://steeditor.app/test/)
    abcdef https://medium.com/@timcliff.steem.witness/its-time-to-start-paying-attention-to-steem-3f60ae0a86d
    ![](https://steemitimages.com/0x0/https://ipfs.busy.org/ipfs/QmSt1N936KKqQExAJBHRHwi6d1jTniyg2r6fdijGVjcchp)
    [NICE LINK](https://steeditor.app/drafts/) this weird mixin is still considered a Markdown tho :(
    [NICE LINK](https://steeditor.app/drafts/)`;

    const links = getLinks(body);

    expect(links).toEqual([
      'https://steeditor.app/',
      'https://utopian.io',
      'https://github.com/jakipatryk/steeditor/pull/82',
      'https://steeditor.app/test/',
      'https://medium.com/@timcliff.steem.witness/its-time-to-start-paying-attention-to-steem-3f60ae0a86d',
      'https://steeditor.app/drafts/'
    ]);
  });

  it('should ignore images', () => {
    const body = `![Markdown is the best!](https://steeditor.app/images/amazing_image)
    <p>test</p>
    [NICELINK](https://steeditor.app/)
    ![test2](https://steeditor.app/images/test2)
    this weird mixin is still considered a Markdown tho :(`;

    const links = getLinks(body);

    expect(links).not.toContain('https://steeditor.app/images/amazing_image');
  });

  it('should return an empty array if there arent any links', () => {
    const body = `HTML is bad, remember blabla :(`;

    const links = getLinks(body);

    expect(links).toEqual([]);
  });
});

fdescribe('#core #steemize (json_metadata) withLinks', () => {
  it('should return an object with `links` property', () => {
    const body = 'anything [link](https://steeditor.app/)';

    const result = withLinks(body)({});

    expect(result.links).toBeDefined();
  });
});

fdescribe('#core #steemize (json_metadata) withCommunity', () => {
  it('should return an object with `community` property equal to provided `community` if it is NOT empty', () => {
    const community = 'steemstem';

    const result = withCommunity(community)({});

    expect(result.community).toBeDefined();
  });

  it('should return a target object if provided `community` is an empty string', () => {
    const community = '';

    const result = withCommunity(community)({});

    expect(result).toEqual({});
  });
});

fdescribe('#core #steemize createJsonMetadata', () => {
  it('should create `json_metadata` with correct properties when `jsonMetadata` of `steeditorPost` is empty', () => {
    const steeditorPost: SteeditorPost = {
      title: '',
      body: 'any body',
      thumbnailUrl: '',
      tags: [],
      community: 'steemstem',
      jsonMetadata: '',
      beneficiaries: [],
      allowVotes: true,
      allowCurationRewards: true,
      percentSteemDollars: 50,
      maxAcceptedPayout: 1000
    };

    const jsonMetadata = createJsonMetadata(steeditorPost);

    expect(jsonMetadata).toContain('app');
    expect(jsonMetadata).toContain('format');
    expect(jsonMetadata).toContain('image');
    expect(jsonMetadata).toContain('tags');
    expect(jsonMetadata).toContain('users');
    expect(jsonMetadata).toContain('links');
    expect(jsonMetadata).toContain('community');
  });
});

fdescribe('#core #steemize withJsonMetadata', () => {
  let steeditorPost: SteeditorPost;

  beforeEach(() => {
    steeditorPost = {
      title: '',
      body: '',
      thumbnailUrl: '',
      tags: [],
      community: '',
      jsonMetadata: '',
      beneficiaries: [],
      allowVotes: true,
      allowCurationRewards: true,
      percentSteemDollars: 50,
      maxAcceptedPayout: 1000
    };
  });

  it('should return an object with `json_metadata` property', () => {
    const result = withJsonMetadata(steeditorPost)({});

    expect(result.json_metadata).toBeDefined();
  });

  it('should NOT mutate the original `steeditorPost` object', () => {
    withJsonMetadata(steeditorPost)({});

    expect(steeditorPost).toEqual({
      title: '',
      body: '',
      thumbnailUrl: '',
      tags: [],
      community: '',
      jsonMetadata: '',
      beneficiaries: [],
      allowVotes: true,
      allowCurationRewards: true,
      percentSteemDollars: 50,
      maxAcceptedPayout: 1000
    });
  });

  it('should NOT mutate the original `target` object', () => {
    const target = {
      body: 'any'
    };

    withJsonMetadata(steeditorPost)(target);

    expect(target).toEqual({
      body: 'any'
    });
  });
});
