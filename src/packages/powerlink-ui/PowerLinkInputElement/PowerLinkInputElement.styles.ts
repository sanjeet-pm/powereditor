/** @jsxImportSource @emotion/react */
// eslint-disable-next-line
import {jsx } from '@emotion/react';
import { createStyles } from '@udecode/plate-styled-components';
import tw, { css } from 'twin.macro'
import { PowerLinkInputElementStyleProps } from './PowerLinkInputElement.types';

export const getPowerLinkInputElementStyles = (
  props: PowerLinkInputElementStyleProps
) =>
  createStyles(
    { prefixClassNames: 'MentionInputElement', ...props },
    {
      root: [
        tw`my-0 mx-px align-baseline inline-block`,
        props.selected && props.focused && tw`boxShadow[0 0 0 2px #B4D5FF]`,
        css`
          padding: 3px 3px 2px;
          border-radius: 4px;
          background-color: #eee;
          font-size: 0.9em;
        `,
      ],
    }
  );
