import { getPlatePluginType, SPEditor } from '@udecode/plate-core';
import { ELEMENT_POWERLINK_INPUT } from '../defaults';

export const getPowerLinkInputType = <T extends SPEditor = SPEditor>(
  editor: T
): string => getPlatePluginType(editor, ELEMENT_POWERLINK_INPUT);
