import { useState, } from 'react'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'

export default function Example1() {

  const [ position, setPosition, ] = useState(0)
  const [ velocity, setVelocity, ] = useState(0)

  let timer: number | undefined

  const handleChange = (e: object, v: number | number[]) => {

    if (typeof v !== 'number')
      return
    
    setVelocity(v)
    if (timer === undefined) {
      timer = window.setInterval(() => { setPosition(position + velocity); }, 250)
    }
  }

  const handleChangeCommitted = (e: object, v: number | number[]) => {

    if (typeof v !== 'number')
      return

    setVelocity(0)
    if (timer !== undefined) {
      window.clearInterval(timer)
      timer = undefined
    }
  }

  return (
    <div>
      <Typography paragraph>
        <strong>Example 1.</strong> The problem appears. position={position} velocity={velocity}
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
