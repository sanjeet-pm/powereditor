import { Data, NoData } from '@udecode/plate-combobox';
import { PlatePluginKey, TElement } from '@udecode/plate-core';
import { CreatePowerLinkNode } from './getPowerLinkOnSelectItem';

export interface PowerLinkNodeData {
  value: string;
}

export interface PowerLinkInputNodeData {
  trigger: string;
}

export type PowerLinkNode = TElement<PowerLinkNodeData>;
export type PowerLinkInputNode = TElement<PowerLinkInputNodeData>;

export interface PowerLinkPluginOptions<TData extends Data = NoData>
  extends PlatePluginKey {
  id?: string;
  trigger?: string;
  insertSpaceAfterPowerLink?: boolean;
  createPowerLinkNode?: CreatePowerLinkNode<TData>;
}
