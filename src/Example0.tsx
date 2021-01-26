import { useState, } from 'react'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'

export default function Example0() {

  const [ value, setValue, ] = useState(0)

  return (
    <div>
      <Typography paragraph>
        <strong>Example 0.</strong> Typical Material-UI Slider component usage. value={value}
      </Typography>
      <Slider
        min={-8}
        max={+8}
        value={value}
        track={false}
        onChange={(e, v, ) => { if (typeof v !== 'number') return; setValue(v); }}
      />
      <Typography paragraph>
        The problematic cases follow.
      </Typography>
    </div>
  )
}
