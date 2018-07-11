import { createEditorConfig, initialConfig } from './config';

fdescribe('#EditorModule EditorComponent config', () => {
  fdescribe('createEditorConfig', () => {
    it('should create config without provided argument', () => {
      const config = createEditorConfig();

      expect(config).toEqual(initialConfig);
    });

    it('should create correct config if only part of config properties were provided', () => {
      const deep0Change = { whenChangesDebounceTime: 1000 };
      const deep1Change = {
        fields: {
          body: {
            value: 'test1',
            disabled: true
          }
        }
      };
      const deep2Change = {
        fields: {
          body: {
            value: 'test2'
          }
        }
      };

      const configWithDeep0Change = createEditorConfig(deep0Change);
      const configWithDeep1Change = createEditorConfig(deep1Change);
      const configWithDeep2Change = createEditorConfig(deep2Change);

      expect(configWithDeep0Change).toEqual({
        ...initialConfig,
        whenChangesDebounceTime: 1000
      });
      expect(configWithDeep1Change).toEqual({
        ...initialConfig,
        fields: {
          ...initialConfig.fields,
          body: {
            value: 'test1',
            disabled: true
          }
        }
      });
      expect(configWithDeep2Change).toEqual({
        ...initialConfig,
        fields: {
          ...initialConfig.fields,
          body: {
            ...initialConfig.fields.body,
            value: 'test2'
          }
        }
      });
    });
  });
});
