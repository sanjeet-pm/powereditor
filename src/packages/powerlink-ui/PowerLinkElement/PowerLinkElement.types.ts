
import { StyledElementProps } from '@udecode/plate-styled-components';
import { PowerLinkNode, PowerLinkNodeData } from '../../powerlink';

export interface PowerLinkElementStyleProps extends PowerLinkElementProps {
  selected?: boolean;
  focused?: boolean;
}

// renderElement props
export interface PowerLinkElementProps
  extends Omit<StyledElementProps<PowerLinkNode>, 'onClick'> {
  /**
   * Prefix rendered before PowerLink
   */
  prefix?: string;
  onClick?: (powerlinkNode: PowerLinkNode) => void;
  renderLabel?: (powerlinkable: PowerLinkNodeData) => string;
}
