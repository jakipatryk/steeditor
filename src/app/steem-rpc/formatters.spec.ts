import {
  assetToNumber,
  extractMetadataFromUserProfile,
  toTotal
} from './formatters';

fdescribe('#SteemRPCModule Formatters', () => {
  fdescribe('assetToNumber', () => {
    it('should remove asset name and parse the result to float', () => {
      const asset = '1000.231 STEEM';

      const asNumber = assetToNumber(asset);

      expect(asNumber).toEqual(1000.231);
    });
  });

  fdescribe('toTotal', () => {
    it('should sum liquid and savings assets (of the same type) and return the result', () => {
      const liquid = '1000.321 SBD';
      const savings = '0.000 SBD';

      const total = toTotal(liquid, savings);

      expect(total).toEqual(1000.321);
    });
  });

  fdescribe('extractMetadataFromUserProfile', () => {
    it('should extract properties that exists in the metadata', () => {
      const metadata = JSON.stringify({
        profile: {
          test: 'test123',
          tuple: true
        }
      });

      const extracted = extractMetadataFromUserProfile(
        { prop: 'test', useName: 'testName' },
        { prop: 'tuple', useName: 'isTouple' }
      )(metadata);

      expect(extracted).toEqual({ testName: 'test123', isTouple: true });
    });

    it('should extract properties that exists in the metadata and default to null these which does not exits', () => {
      const metadata = JSON.stringify({
        profile: {
          test: 'test123',
          tuple: true
        }
      });

      const extracted = extractMetadataFromUserProfile(
        { prop: 'test', useName: 'testName' },
        { prop: 'tuple', useName: 'isTouple' },
        { prop: 'dontExitst', useName: 'noop' }
      )(metadata);

      expect(extracted).toEqual({
        testName: 'test123',
        isTouple: true,
        noop: null
      });
    });

    it('should return empty object if metadata is empty', () => {
      const metadata = '';

      const extracted = extractMetadataFromUserProfile({
        prop: 'test',
        useName: 'testName'
      })(metadata);

      expect(extracted).toEqual({});
    });

    it('should return empty object if metadata doesnt have `profile` prop', () => {
      const metadata = JSON.stringify({ test: 123 });

      const extracted = extractMetadataFromUserProfile({
        prop: 'test',
        useName: 'testName'
      })(metadata);

      expect(extracted).toEqual({});
    });
  });
});
