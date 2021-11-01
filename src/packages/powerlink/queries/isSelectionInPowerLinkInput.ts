import { SPEditor } from '@udecode/plate-core';
import { findPowerLinkInput } from './findPowerLinkInput';

export const isSelectionInPowerLinkInput = (editor: SPEditor) =>
  findPowerLinkInput(editor) !== undefined;
