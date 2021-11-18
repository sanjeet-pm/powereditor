/** @jsxImportSource @emotion/react */
import { Combobox, ComboboxProps, Data, NoData } from '@udecode/plate-combobox';
import {
  getPlatePluginOptions,
  PlatePluginKey,
  usePlateEditorRef,
} from '@udecode/plate-core';
import { ELEMENT_POWERLINK, getPowerLinkOnSelectItem, PowerLinkPluginOptions } from '../../powerlink';


export const PowerLinkCombobox = <TData extends Data = NoData>({
  items,
  component,
  onRenderItem,
  pluginKey = ELEMENT_POWERLINK,
  id = pluginKey,
}: Pick<
  Partial<ComboboxProps<TData>>,
  'id' | 'items' | 'component' | 'onRenderItem'
> &
  PlatePluginKey) => {
  const editor = usePlateEditorRef();

  const { trigger } = getPlatePluginOptions<Required<PowerLinkPluginOptions>>(
    editor,
    pluginKey
  );

  return (
    <Combobox
      id={id}
      trigger={trigger}
      controlled
      items={items}
      component={component}
      onRenderItem={onRenderItem}
      onSelectItem={getPowerLinkOnSelectItem({
        pluginKey,
      })}
    />
  );
};
