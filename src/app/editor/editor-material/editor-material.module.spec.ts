import { EditorMaterialModule } from './editor-material.module';

describe('EditorMaterialModule', () => {
  let editorMaterialModule: EditorMaterialModule;

  beforeEach(() => {
    editorMaterialModule = new EditorMaterialModule();
  });

  it('should create an instance', () => {
    expect(editorMaterialModule).toBeTruthy();
  });
});
