
import { StyledElementProps } from '@udecode/plate-styled-components';
import { PowerLinkNode, PowerLinkNodeData } from '../../powerlink';

export interface PowerLinkInputElementStyleProps
  extends PowerLinkInputElementProps {
  selected?: boolean;
  focused?: boolean;
}

// renderElement props
export interface PowerLinkInputElementProps
  extends Omit<StyledElementProps<PowerLinkNode>, 'onClick'> {
  /**
   * Prefix rendered before powerlink
   */
  prefix?: string;
  onClick?: (powerLinkNode: PowerLinkNode) => void;
  renderLabel?: (powerlinkable: PowerLinkNodeData) => string;
}
