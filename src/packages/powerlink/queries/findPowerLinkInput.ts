import { findNode, FindNodeOptions } from '@udecode/plate-common';
import { SPEditor } from '@udecode/plate-core';
import { getPowerLinkInputType } from '../options';

export const findPowerLinkInput = (
  editor: SPEditor,
  options?: Omit<FindNodeOptions, 'match'>
) =>
  findNode(editor, {
    ...options,
    match: { type: getPowerLinkInputType(editor) },
  });
