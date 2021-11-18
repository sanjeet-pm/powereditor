/** @jsxImportSource @emotion/react */
import { getHandler } from '@udecode/plate-common';
import { getRootProps } from '@udecode/plate-styled-components';
import { useFocused, useSelected } from 'slate-react';
import { getPowerLinkInputElementStyles } from './PowerLinkInputElement.styles';
import { PowerLinkInputElementProps } from './PowerLinkInputElement.types';

export const PowerLinkInputElement = (props: PowerLinkInputElementProps) => {
  const { attributes, children, nodeProps, element, as, onClick } = props;

  const rootProps = getRootProps(props);

  const selected = useSelected();
  const focused = useFocused();

  const styles = getPowerLinkInputElementStyles({
    ...props,
    selected,
    focused,
  });

  return (
    <span
      {...attributes}
      as={as}
      data-slate-value={element.value}
      className={styles.root.className}
      css={styles.root.css}
      contentEditable={false}
      onClick={getHandler(onClick, element)}
      {...rootProps}
      {...nodeProps}
    >
      {'Incomplete'}
      {children}
    </span>
  );
};
