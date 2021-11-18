import { insertNodes } from '@udecode/plate-common';
import { getPlatePluginOptions, WithOverride } from '@udecode/plate-core';
import { defaults } from 'lodash';
import { Editor, Node, Range, Transforms } from 'slate';
import { HistoryEditor } from 'slate-history';
import { removePowerLinkInput } from './transforms/removePowerLinkInput';
import { COMBOBOX_TRIGGER_POWERLINK, ELEMENT_POWERLINK } from './defaults';
import { getPowerLinkInputType } from './options';
import {
  findPowerLinkInput,
  isNodePowerLinkInput,
  isSelectionInPowerLinkInput,
} from './queries';
import { PowerLinkInputNode, PowerLinkPluginOptions } from './types';
import { setSelection } from '../../services/selection.service';
import { panelService } from '../../services/panel.service';

export const withPowerLink = ({
  pluginKey = ELEMENT_POWERLINK,
  ...options
}: PowerLinkPluginOptions = {}): WithOverride => (editor) => {
  const { apply, insertText, deleteBackward } = editor;

  // TODO: extend plate-core to register options
  editor.options[pluginKey] = defaults(options, {
    pluginKey,
    type: pluginKey,
    id: pluginKey,
    trigger: COMBOBOX_TRIGGER_POWERLINK,
    createPowerLinkNode: (item) => ({ value: item.text }),
  } as PowerLinkPluginOptions);

  const { trigger, id } = getPlatePluginOptions<PowerLinkPluginOptions>(
    editor,
    pluginKey
  );

  editor.deleteBackward = (unit) => {
    const currentPowerLinkInput = findPowerLinkInput(editor);
    if (currentPowerLinkInput && Node.string(currentPowerLinkInput[0]) === '') {
      return removePowerLinkInput(editor, currentPowerLinkInput[1]);
    }

    deleteBackward(unit);
  };

  editor.insertText = (text) => {
    if (isSelectionInPowerLinkInput(editor)) {
      return Transforms.insertText(editor, text);
    }

    if (!editor.selection || text !== trigger) {
      return insertText(text);
    }

    // Make sure a PowerLink input is created at the beginning of line or after a whitespace
    const previousCharLocation = Editor.before(editor, editor.selection);
    if (previousCharLocation) {
      const previousChar = Editor.string(
        editor,
        Editor.range(editor, editor.selection, previousCharLocation)
      );
      if (previousChar !== '' && previousChar !== ' ') {
        return insertText(text);
      }
    }

    insertNodes<PowerLinkInputNode>(editor, {
      type: getPowerLinkInputType(editor),
      children: [{ text: 'Incomplete' }],
      trigger,
    });
  };

  editor.apply = (operation) => {
    if (HistoryEditor.isHistoryEditor(editor) && findPowerLinkInput(editor)) {
      HistoryEditor.withoutSaving(editor, () => apply(operation));
    } else {
      apply(operation);
    }

    if (operation.type === 'insert_text' || operation.type === 'remove_text') {
      const currentPowerLinkInput = findPowerLinkInput(editor);
      if (currentPowerLinkInput) {
        // comboboxStore.set.text(Node.string(currentPowerLinkInput[0]));
      }
    } else if (operation.type === 'set_selection') {
      const previousPowerLinkInputPath = Range.isRange(operation.properties)
        ? findPowerLinkInput(editor, { at: operation.properties })?.[1]
        : undefined;

      const currentPowerLinkInputPath = Range.isRange(operation.newProperties)
        ? findPowerLinkInput(editor, { at: operation.newProperties })?.[1]
        : undefined;

      if (previousPowerLinkInputPath && !currentPowerLinkInputPath) {
        removePowerLinkInput(editor, previousPowerLinkInputPath);
      }

      if (currentPowerLinkInputPath) {
        setSelection(editor.selection);
      }
    } else if (
      operation.type === 'insert_node' &&
      isNodePowerLinkInput(editor, operation.node)
    ) {
      if (operation.node.trigger !== trigger) {
        return;
      }

      panelService.sendMessage('Open Side Panel');
    } else if (
      operation.type === 'remove_node' &&
      isNodePowerLinkInput(editor, operation.node)
    ) {
      if (operation.node.trigger !== trigger) {
        return;
      }

      // comboboxStore.set.reset();
    }
  };

  return editor;
};
