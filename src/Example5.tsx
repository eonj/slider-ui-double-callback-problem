/**
 * Thx to Kroisse @Kroisse
 */

import { useState, useEffect, } from 'react'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'

export default function Example5() {

  const [ position, setPosition, ] = useState(0)
  const [ velocity, setVelocity, ] = useState(0)
  const [ animated, setAnimated, ] = useState(false)

  const handleChange = (e: object, v: number | number[]) => {

    if (typeof v !== 'number')
      return
    
    setVelocity(v)
    setAnimated(true)
  }

  const handleChangeCommitted = (e: object, v: number | number[]) => {

    if (typeof v !== 'number')
      return

    setVelocity(0)
    setAnimated(false)
  }

  useEffect(
    () => {

      if (!animated) {
        return
      }

      const cb = () => { setPosition(position => position + velocity); }
      const id = window.setInterval(cb, 250)
      return () => { window.clearInterval(id); }
    },
    [velocity, animated, ],
  )

  return (
    <div>
      <Typography paragraph>
        <strong>Example 5.</strong> Using <code>useEffect</code> and cancel every loop when velocity changes. Thanks to @Kroisse in LangDev. No callback reaches when slider is moved fast (&lt; 250 ms per change). position={position} velocity={velocity}
      </Typography>
      <Slider
        min={-8}
        max={+8}
        value={velocity}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
      />
    </div>
  )
}
