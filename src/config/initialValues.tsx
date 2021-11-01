import { getNodesWithRandomId } from "./utils"

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@udecode/plate-test-utils'
export const initialValueForcedLayout: any = (
  <fragment>
    {/* <hh1>
      <htext />
    </hh1> */}
    <hp>
      <htext />
    </hp>
  </fragment>
)
export const initialValuePlayground: any = getNodesWithRandomId([
  ...initialValueForcedLayout
])
