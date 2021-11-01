import {
  ELEMENT_LI,
  ELEMENT_LIC,
  ELEMENT_OL,
  ELEMENT_PARAGRAPH,
  ELEMENT_UL,
  TElement,
  toggleList,
  unwrapList,
} from '@udecode/plate'
import { Editor, Text, Transforms, Element as SlateElement } from 'slate'

export const createElement = (
  text = '',
  {
    type = ELEMENT_PARAGRAPH,
    mark,
  }: {
    type?: string
    mark?: string
  } = {}
) => {
  const leaf: any = { text }
  if (mark) {
    leaf[mark as any] = true
  }

  return {
    type,
    children: [leaf],
  }
}

export const createList = (
  items: string[],
  { splitSeparator = '`' }: { splitSeparator?: string } = {},
  type = ELEMENT_OL
): TElement[] => {
  const children: any = items.map((item) => {
    const texts = item.split(splitSeparator)
    const marks: Text[] = texts.map((text, index) => {
      const res: any = { text }
      if (index % 2 === 1) {
        res.code = true
      }
      return res
    })

    return {
      type: ELEMENT_LI,
      children: [
        {
          type: ELEMENT_LIC,
          children: marks,
        },
      ],
    }
  })

  return [
    {
      type: type as any,
      children,
    },
  ]
}

export const getNodesWithRandomId = (nodes: any[]) => {
  let _id = 10000
  nodes.forEach((node) => {
    node.id = _id
    _id++
  })

  return nodes
}

export const toggleBlock = (editor: any, format: any) => {
  const isActive = isBlockActive(editor, format);
  const LIST_TYPES = [ELEMENT_OL, ELEMENT_UL];
  const isList = LIST_TYPES.includes(format);
  unwrapList(editor);
  if (!isActive && isList) {
    toggleList(editor, { type: format });
  } else {
    const newProperties: any = {
      id: (+new Date()),
      type: isActive ? 'paragraph' : format,
    }
    Transforms.setNodes(editor, newProperties)
  }
}

const isBlockActive = (editor: any, format: any) => {
  const match = Editor.nodes(editor, {
    match: n =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && (n as any).type === format,
  })

  return !!match
}