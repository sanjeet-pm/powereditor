import './App.css';
import 'twin.macro';
import { createHistoryPlugin, createReactPlugin, Plate, PlatePlugin } from '@udecode/plate-core';
import {
  createAlignPlugin,
  createBlockquotePlugin,
  createBoldPlugin,
  createCodeBlockPlugin,
  createCodePlugin,
  createDeserializeAstPlugin,
  createDeserializeCSVPlugin,
  createDeserializeHTMLPlugin,
  createDeserializeMDPlugin,
  createDndPlugin,
  createFontBackgroundColorPlugin,
  createFontColorPlugin,
  createHeadingPlugin,
  createHighlightPlugin,
  createImagePlugin,
  createItalicPlugin,
  createKbdPlugin,
  createLinkPlugin,
  createListPlugin,
  createMediaEmbedPlugin,
  createNodeIdPlugin,
  createParagraphPlugin,
  createPlateComponents,
  createPlateOptions,
  createSelectOnBackspacePlugin,
  createStrikethroughPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin,
  createTablePlugin,
  createTodoListPlugin,
  createUnderlinePlugin,
  ELEMENT_IMAGE,
  ELEMENT_MEDIA_EMBED,
  withProps,
} from '@udecode/plate';
import { useMemo } from 'react';
import { PowerLinkElement, PowerLinkInputElement } from './packages/powerlink-ui';
import { createPowerLinkPlugin, ELEMENT_POWERLINK, ELEMENT_POWERLINK_INPUT } from './packages/powerlink';
import { PowerLinkPanel } from './components/link';

function App() {
  const components = createPlateComponents({
    [ELEMENT_POWERLINK]: withProps(PowerLinkElement, {}),
    [ELEMENT_POWERLINK_INPUT]: withProps(PowerLinkInputElement, {})
  });
  const options = createPlateOptions({

  });

  const pluginsMemo: PlatePlugin[] = useMemo(() => {
    const plugins = [
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
      createSelectOnBackspacePlugin({
        allow: [ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED],
      }),
      createPowerLinkPlugin()
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
    <div style={{
      margin: '40px',
      border: '1px solid black',
      height: '80vh'
    }}>
      <Plate
        plugins={pluginsMemo}
        components={components}
        options={options}
      >
        <PowerLinkPanel></PowerLinkPanel>
        {/* <PowerLinkCombobox items={[{ key: '1', text: 'Sanjeet Singh' }]}></PowerLinkCombobox> */}
      </Plate>
    </div>
  );
}

export default App;
