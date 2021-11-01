import { AnyObject, PlatePluginKey, TElement } from '@udecode/plate-core';

export interface PowerLinkNodeData extends AnyObject {
  value: string;
}

export type PowerLinkNode = TElement<PowerLinkNodeData>;

export interface PowerLinkPluginOptions extends PlatePluginKey {
  trigger?: string;
}
