import {
  getPlatePluginOptions,
  PlatePluginOptions,
  SPEditor,
} from '@udecode/plate-core';
import { ELEMENT_POWERLINK_INPUT } from '../defaults';
import { PowerLinkPluginOptions } from '../types';

export const getPowerLinkInputPluginOptions = <T extends SPEditor = SPEditor>(
  editor: T
): PlatePluginOptions<PowerLinkPluginOptions> =>
  getPlatePluginOptions<PowerLinkPluginOptions>(editor, ELEMENT_POWERLINK_INPUT);
