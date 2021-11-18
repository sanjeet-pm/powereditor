import {
  getPlatePluginOptions,
  PlateEditor,
  PlatePluginOptions,
} from '@udecode/plate-core';
import { ELEMENT_POWERLINK_INPUT } from '../defaults';
import { PowerLinkPluginOptions } from '../types';

export const getPowerLinkInputPluginOptions = <T = {}>(
  editor: PlateEditor<T>
): PlatePluginOptions<PowerLinkPluginOptions> =>
  getPlatePluginOptions<PowerLinkPluginOptions>(editor, ELEMENT_POWERLINK_INPUT);
