import {
  getPlatePluginTypes,
  getRenderElement,
  PlatePlugin,
} from '@udecode/plate-core';
import { ELEMENT_POWERLINK, ELEMENT_POWERLINK_INPUT } from './defaults';
import { getPowerLinkDeserialize } from './getPowerLinkDeserialize';
import { moveSelectionByOffset } from './moveSelectionByOffset';
import { isSelectionInPowerLinkInput } from './queries';
import { PowerLinkPluginOptions } from './types';
import { withPowerLink } from './withPowerLink';

/**
 * Enables support for autocompleting @PowerLink.
 */
export const createPowerLinkPlugin = (
  options?: PowerLinkPluginOptions
): PlatePlugin => {
  const { pluginKey = ELEMENT_POWERLINK } = options ?? {};

  return {
    pluginKeys: [pluginKey, ELEMENT_POWERLINK_INPUT],
    renderElement: getRenderElement([pluginKey, ELEMENT_POWERLINK_INPUT]),
    deserialize: getPowerLinkDeserialize(pluginKey),
    inlineTypes: getPlatePluginTypes([pluginKey, ELEMENT_POWERLINK_INPUT]),
    voidTypes: getPlatePluginTypes([pluginKey, ELEMENT_POWERLINK_INPUT]),
    withOverrides: withPowerLink(options),
    onKeyDown: (editor) =>
      moveSelectionByOffset(editor, { query: isSelectionInPowerLinkInput }),
  };
};
