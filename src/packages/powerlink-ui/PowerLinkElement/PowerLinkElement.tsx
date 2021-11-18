/** @jsxImportSource @emotion/react */
import { getHandler } from '@udecode/plate-common';
import { getRootProps } from '@udecode/plate-styled-components';
import { useFocused, useSelected } from 'slate-react';
import { getPowerLinkElementStyles } from './PowerLinkElement.styles';
import { PowerLinkElementProps } from './PowerLinkElement.types';

export const PowerLinkElement = (props: PowerLinkElementProps) => {
  const {
    attributes,
    children,
    nodeProps,
    element,
    prefix,
    as,
    onClick,
    renderLabel,
  } = props;

  const rootProps = getRootProps(props);

  const selected = useSelected();
  const focused = useFocused();

  const styles = getPowerLinkElementStyles({ ...props, selected, focused });

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
      {prefix}
      {renderLabel ? renderLabel(element) : element.value}
      {children}
    </span>
  );
};
