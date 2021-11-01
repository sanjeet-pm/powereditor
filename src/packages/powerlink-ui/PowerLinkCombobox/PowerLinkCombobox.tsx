import React from 'react';
import { Combobox, ComboboxProps } from '@udecode/plate-combobox';
import { PlatePluginKey } from '@udecode/plate-core';
import { COMBOBOX_TRIGGER_POWERLINK, CreatePowerLinkNode, ELEMENT_POWERLINK, getPowerLinkOnSelectItem } from '../../powerlink';

export const PowerLinkCombobox = ({
  items,
  component,
  onRenderItem,
  pluginKey = ELEMENT_POWERLINK,
  id = pluginKey,
  trigger = COMBOBOX_TRIGGER_POWERLINK,
  insertSpaceAfterPowerLink,
  createPowerLinkNode,
}: Pick<ComboboxProps, 'items' | 'component' | 'onRenderItem'> & {
  id?: string;
  trigger?: string;
  insertSpaceAfterPowerLink?: boolean;
  createPowerLinkNode?: CreatePowerLinkNode;
} & PlatePluginKey) => (
  <Combobox
    id={id}
    trigger={trigger}
    controlled
    items={items}
    component={component}
    onRenderItem={onRenderItem}
    onSelectItem={getPowerLinkOnSelectItem({
      pluginKey: id,
      insertSpaceAfterPowerLink,
      createPowerLinkNode,
    })}
  />
);
