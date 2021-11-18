import { PlateEditor } from '@udecode/plate-core';
import { findPowerLinkInput } from './findPowerLinkInput';

export const isSelectionInPowerLinkInput = (editor: PlateEditor) =>
  findPowerLinkInput(editor) !== undefined;
