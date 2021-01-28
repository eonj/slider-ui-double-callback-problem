import Example9JogShuttleSlider from './Example9JogShuttleSlider'

import * as React from 'react'
import Typography from '@material-ui/core/Typography'

export default function Example9() {
  const [ position, setPosition, ] = React.useState(0)

  return (
    <div>
      <Typography paragraph>
        <strong>Example 9.</strong> rAF component. position={position}
      </Typography>
      <Example9JogShuttleSlider
        steps={8}
        behavior="exponential"
        durationMillisPerStep={200}
        onChange={(change) => setPosition(position => position + change)}
      />
    </div>
  );
}
