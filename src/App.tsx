import './App.css';
import 'twin.macro';
import { createHistoryPlugin, createReactPlugin, Plate, PlatePlugin } from '@udecode/plate-core';
import { createAlignPlugin, createAutoformatPlugin, createBlockquotePlugin, createBoldPlugin, createCodeBlockPlugin, createCodePlugin, createComboboxPlugin, createDeserializeAstPlugin, createDeserializeCSVPlugin, createDeserializeHTMLPlugin, createDeserializeMDPlugin, createDndPlugin, createExitBreakPlugin, createFontBackgroundColorPlugin, createFontColorPlugin, createHeadingPlugin, createHighlightPlugin, createImagePlugin, createItalicPlugin, createKbdPlugin, createLinkPlugin, createListPlugin, createMediaEmbedPlugin, createNodeIdPlugin, createParagraphPlugin, createPlateComponents, createPlateOptions, createResetNodePlugin, createSelectOnBackspacePlugin, createSoftBreakPlugin, createStrikethroughPlugin, createSubscriptPlugin, createSuperscriptPlugin, createTablePlugin, createTodoListPlugin, createTrailingBlockPlugin, createUnderlinePlugin, ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED, ELEMENT_PARAGRAPH, withProps } from '@udecode/plate';
import { useMemo } from 'react';
import { optionsAutoformat, optionsResetBlockTypePlugin, optionsSoftBreakPlugin, optionsExitBreakPlugin } from './config/pluginOptions';
import { SPEditor } from "@udecode/plate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";
import { MENTIONABLES } from './config/mentionables';
import { PowerLinkCombobox, PowerLinkElement, PowerLinkInputElement } from './packages/powerlink-ui';
import { createPowerLinkPlugin, ELEMENT_POWERLINK, ELEMENT_POWERLINK_INPUT } from './packages/powerlink';

export type TEditor = SPEditor & ReactEditor & HistoryEditor

function App() {
  const components = createPlateComponents({
    [ELEMENT_POWERLINK_INPUT]: withProps(PowerLinkInputElement, {}),
    [ELEMENT_POWERLINK]: withProps(PowerLinkElement, {}),
  });
  const options = createPlateOptions({
    [ELEMENT_POWERLINK_INPUT]: withProps(PowerLinkInputElement, {}),
    [ELEMENT_POWERLINK]: withProps(PowerLinkElement, {}),
  });

  const pluginsMemo: PlatePlugin<TEditor>[] = useMemo(() => {
    const plugins = [
      //   createEventPlugin(),
      createReactPlugin(),
      createHistoryPlugin(),
      createParagraphPlugin(),
      createBlockquotePlugin(),
      createTodoListPlugin(),
      createHeadingPlugin(),
      createImagePlugin(),
      createLinkPlugin(),
      createListPlugin(),
      createTablePlugin(),
      createMediaEmbedPlugin(),
      createCodeBlockPlugin(),
      createAlignPlugin(),
      createBoldPlugin(),
      createCodePlugin(),
      createItalicPlugin(),
      createHighlightPlugin(),
      createUnderlinePlugin(),
      createStrikethroughPlugin(),
      createSubscriptPlugin(),
      createSuperscriptPlugin(),
      createFontColorPlugin(),
      createFontBackgroundColorPlugin(),
      createKbdPlugin(),
      createNodeIdPlugin(),
      createDndPlugin(),
      createAutoformatPlugin(optionsAutoformat),
      createResetNodePlugin(optionsResetBlockTypePlugin),
      createSoftBreakPlugin(optionsSoftBreakPlugin),
      createExitBreakPlugin(optionsExitBreakPlugin),
      createTrailingBlockPlugin({
        type: ELEMENT_PARAGRAPH,
      }),
      createSelectOnBackspacePlugin({
        allow: [ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED],
      }),
      createComboboxPlugin(),
      createPowerLinkPlugin()
      //   searchHighlightPlugin,
    ]

    plugins.push(
      ...[
        createDeserializeMDPlugin({ plugins }),
        createDeserializeCSVPlugin({ plugins }),
        createDeserializeHTMLPlugin({ plugins }),
        createDeserializeAstPlugin({ plugins }),
      ]
    )
    return plugins
  }, []);

  return (
    <Plate
      plugins={pluginsMemo}
      components={components}
      options={options}
    >
      <PowerLinkCombobox items={MENTIONABLES}></PowerLinkCombobox>
    </Plate>
  );
}

export default App;
