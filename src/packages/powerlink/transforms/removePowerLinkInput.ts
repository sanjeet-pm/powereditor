import { PlateEditor } from '@udecode/plate-core';
import { Editor, Path } from 'slate';

export const removePowerLinkInput = (editor: PlateEditor, path: Path) =>
  Editor.withoutNormalizing(editor, () => {
    // const { trigger } = Node.get(editor, path) as TDescendant;

    // Transforms.insertText(editor, trigger, {
    //   at: { path: [...path, 0], offset: 0 },
    // });
    // Transforms.unwrapNodes(editor, {
    //   at: path,
    // });
  });
