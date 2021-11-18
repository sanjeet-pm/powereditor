import { findNode, FindNodeOptions } from '@udecode/plate-common';
import { PlateEditor } from '@udecode/plate-core';
import { getPowerLinkInputType } from '../options';

export const findPowerLinkInput = (
  editor: PlateEditor,
  options?: Omit<FindNodeOptions, 'match'>
) =>
  findNode(editor, {
    ...options,
    match: { type: getPowerLinkInputType(editor) },
  });
