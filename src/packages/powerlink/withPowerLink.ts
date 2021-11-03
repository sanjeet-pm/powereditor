import { comboboxStore } from '@udecode/plate-combobox';
import { insertNodes } from '@udecode/plate-common';
import { SPEditor, WithOverride } from '@udecode/plate-core';
import { Editor, Node, Range, Transforms } from 'slate';
import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react';
import { removePowerLinkInput } from './transforms/removePowerLinkInput';
import { getPowerLinkInputType } from './options';
import {
  findPowerLinkInput,
  isNodePowerLinkInput,
  isSelectionInPowerLinkInput,
} from './queries';

export const withPowerLink = ({
  id,
  trigger,
}: {
  id: string;
  trigger: string;
}): WithOverride<ReactEditor & SPEditor> => (editor) => {
  const { apply, insertText, deleteBackward } = editor;

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

    // Make sure a powerlink input is created at the beginning of line or after a whitespace
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

    insertNodes(editor, {
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
        comboboxStore.set.text(Node.string(currentPowerLinkInput[0]));
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
        comboboxStore.set.targetRange(editor.selection);
      }
    } else if (
      operation.type === 'insert_node' &&
      isNodePowerLinkInput(editor, operation.node)
    ) {
      if (operation.node.trigger !== trigger) {
        return;
      }

      comboboxStore.set.open({
        activeId: id,
        text: '',
        targetRange: editor.selection,
      });
    } else if (
      operation.type === 'remove_node' &&
      isNodePowerLinkInput(editor, operation.node)
    ) {
      if (operation.node.trigger !== trigger) {
        return;
      }

      comboboxStore.set.reset();
    }
  };

  return editor;
};
