import {
  ComboboxItemData,
  ComboboxOnSelectItem,
  comboboxStore,
} from '@udecode/plate-combobox';
import { getBlockAbove, insertNodes } from '@udecode/plate-common';
import {
  getPlatePluginType,
  PlatePluginKey,
  TElement,
} from '@udecode/plate-core';
import { Editor, Transforms } from 'slate';
import { ELEMENT_POWERLINK, ELEMENT_POWERLINK_INPUT } from './defaults';

export interface CreatePowerLinkNode {
  (item: ComboboxItemData): Record<string, unknown>;
}

export const getPowerLinkOnSelectItem = ({
  pluginKey = ELEMENT_POWERLINK,
  createPowerLinkNode = (item) => ({ value: item.text }),
  insertSpaceAfterPowerLink,
}: {
  createPowerLinkNode?: CreatePowerLinkNode;
  insertSpaceAfterPowerLink?: boolean;
} & PlatePluginKey = {}): ComboboxOnSelectItem => (editor, item) => {
  debugger;
  const targetRange = comboboxStore.get.targetRange();
  if (!targetRange) return;

  const type = getPlatePluginType(editor, pluginKey);
  const pathAbove = getBlockAbove(editor)?.[1];
  const isBlockEnd =
    editor.selection &&
    pathAbove &&
    Editor.isEnd(editor, editor.selection.anchor, pathAbove);

  Editor.withoutNormalizing(editor, () => {
    // insert a space to fix the bug
    if (isBlockEnd) {
      Transforms.insertText(editor, ' ');
    }

    // select the text and insert the element
    Transforms.select(editor, targetRange);

    Transforms.removeNodes(editor, {
      // TODO: replace any
      match: (node: any) => node.type === ELEMENT_POWERLINK_INPUT,
    });
    insertNodes<TElement>(editor, {
      type,
      children: [{ text: '' }],
      ...createPowerLinkNode(item),
    });
    // move the selection after the element
    Transforms.move(editor);

    // delete the inserted space
    if (isBlockEnd && !insertSpaceAfterPowerLink) {
      Transforms.delete(editor);
    }
  });
  return comboboxStore.set.reset();
};
