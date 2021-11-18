import { PlateEditor, TDescendant } from '@udecode/plate-core';
import { getPowerLinkInputType } from '../options';
import { PowerLinkInputNode } from '../types';

export const isNodePowerLinkInput = (
  editor: PlateEditor,
  node: TDescendant
): node is PowerLinkInputNode => node.type === getPowerLinkInputType(editor);
