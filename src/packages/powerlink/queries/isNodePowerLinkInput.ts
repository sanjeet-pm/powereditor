import { SPEditor, TDescendant, TElement } from '@udecode/plate-core';
import { getPowerLinkInputType } from '../options';

export const isNodePowerLinkInput = (
  editor: SPEditor,
  node: TDescendant
): node is TElement<{ trigger: string }> =>
  node.type === getPowerLinkInputType(editor);
