import { EditorModule } from './editor.module';

fdescribe('EditorModule', () => {
  let editorModule: EditorModule;

  beforeEach(() => {
    editorModule = new EditorModule();
  });

  it('should create an instance', () => {
    expect(editorModule).toBeTruthy();
  });
});
