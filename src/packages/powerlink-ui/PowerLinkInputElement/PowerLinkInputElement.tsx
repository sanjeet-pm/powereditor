import * as React from 'react';
import { getHandler } from '@udecode/plate-common';
import { useFocused, useSelected } from 'slate-react';
import { getPowerLinkInputElementStyles } from './PowerLinkInputElement.styles';
import { PowerLinkInputElementProps } from './PowerLinkInputElement.types';

export const PowerLinkInputElement = (props: PowerLinkInputElementProps) => {
  const {
    attributes,
    children,
    nodeProps,
    styles: _styles,
    element,
    classNames,
    prefixClassNames,
    prefix,
    as,
    onClick,
    renderLabel,
    ...rootProps
  } = props;

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
      onClick={getHandler(onClick, element)}
      {...rootProps}
      {...nodeProps}
    >
      {children}
    </span>
  );
};
