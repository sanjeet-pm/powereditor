import './App.css';
import 'twin.macro';
import { createHistoryPlugin, createReactPlugin, Plate, PlatePlugin } from '@udecode/plate-core';
import {
  createAlignPlugin,
  createBlockquotePlugin,
  createBoldPlugin,
  createCodeBlockPlugin,
  createCodePlugin,
  createComboboxPlugin,
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
  createMentionPlugin,
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
  MentionCombobox,
} from '@udecode/plate';
import { useMemo } from 'react';

function App() {
  const components = createPlateComponents({

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
      createComboboxPlugin(),
      createMentionPlugin()
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
        <MentionCombobox items={[{ key: '1', text: 'Sanjeet Singh' }]}></MentionCombobox>
      </Plate>
    </div>
  );
}

export default App;
