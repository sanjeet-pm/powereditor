import {
  ComboboxOnSelectItem,
  comboboxStore,
  Data,
  NoData,
  TComboboxItem,
} from '@udecode/plate-combobox';
import { getBlockAbove, insertNodes } from '@udecode/plate-common';
import { getPlatePluginOptions, PlatePluginKey } from '@udecode/plate-core';
import { Editor, Transforms } from 'slate';
import { ELEMENT_POWERLINK, ELEMENT_POWERLINK_INPUT } from './defaults';
import { PowerLinkNode, PowerLinkNodeData, PowerLinkPluginOptions } from './types';

export interface CreatePowerLinkNode<TData extends Data> {
  (item: TComboboxItem<TData>): PowerLinkNodeData;
}

export const getPowerLinkOnSelectItem = <TData extends Data = NoData>({
  pluginKey = ELEMENT_POWERLINK,
}: PlatePluginKey = {}): ComboboxOnSelectItem<TData> => (editor, item) => {
  const targetRange = comboboxStore.get.targetRange();
  if (!targetRange) return;

  const {
    type,
    insertSpaceAfterPowerLink,
    createPowerLinkNode,
  } = getPlatePluginOptions<Required<PowerLinkPluginOptions>>(editor, pluginKey);

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

    insertNodes<PowerLinkNode>(editor, {
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
