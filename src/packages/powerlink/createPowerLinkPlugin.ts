import {
  getPlatePluginTypes,
  getRenderElement,
  PlatePlugin,
} from '@udecode/plate-core';
import {
  COMBOBOX_TRIGGER_POWERLINK,
  ELEMENT_POWERLINK,
  ELEMENT_POWERLINK_INPUT,
} from './defaults';
import { getPowerLinkDeserialize } from './getPowerLinkDeserialize';
import { moveSelectionByOffset } from './moveSelectionByOffset';
import { isSelectionInPowerLinkInput } from './queries';
import { PowerLinkPluginOptions } from './types';
import { withPowerLink } from './withPowerLink';

/**
 * Enables support for autocompleting @powerlinks.
 */
export const createPowerLinkPlugin = ({
  pluginKey = ELEMENT_POWERLINK,
  trigger = COMBOBOX_TRIGGER_POWERLINK,
}: PowerLinkPluginOptions = {}): PlatePlugin => ({
  pluginKeys: [pluginKey, ELEMENT_POWERLINK_INPUT],
  renderElement: getRenderElement([pluginKey, ELEMENT_POWERLINK_INPUT]),
  deserialize: getPowerLinkDeserialize(pluginKey),
  inlineTypes: getPlatePluginTypes([pluginKey, ELEMENT_POWERLINK_INPUT]),
  voidTypes: getPlatePluginTypes(pluginKey),
  withOverrides: withPowerLink({ id: pluginKey, trigger }),
  onKeyDown: (editor) =>
    moveSelectionByOffset(editor, { query: isSelectionInPowerLinkInput }),
});
