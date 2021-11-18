import { getPlatePluginType, PlateEditor } from '@udecode/plate-core';
import { ELEMENT_POWERLINK_INPUT } from '../defaults';

export const getPowerLinkInputType = <T = {}>(editor: PlateEditor<T>): string =>
  getPlatePluginType(editor, ELEMENT_POWERLINK_INPUT);
