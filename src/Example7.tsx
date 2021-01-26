import * as React from 'react'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'

export default function Example7() {

  const [ position, setPosition, ] = React.useState(0)
  const [ velocity, setVelocity, ] = React.useState(0)
  const [ last, setLast, ] = React.useState(0)

  const handleChange = (e: object, v: number | number[]) => {

    if (typeof v !== 'number')
      return
    
    setVelocity(v)
  }

  const handleChangeCommitted = (e: object, v: number | number[]) => {

    if (typeof v !== 'number')
      return

    setVelocity(0)
  }

  const animFrameCallback = React.useCallback(
    (now: number) => {
      console.log(`now: ${now} last: ${last} velocity: ${velocity}`)
      if (now < last + 500) {
        return
      }
      setPosition(position => position + velocity)
      setLast(last => last + 500)

      if (velocity !== 0) {
        window.requestAnimationFrame(animFrameCallback)
      }
    },
    [velocity, last, ],
  )

  React.useEffect(
    () => {
      if (velocity !== 0) {
        setLast(performance.now())
        animFrameCallback(performance.now())
      }
      return () => {}
    },
    [ animFrameCallback, velocity, ],
  )

  return (
    <div>
      <Typography paragraph>
        <strong>Example 7.</strong> trying rAF (total failure). position={position} velocity={velocity}
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
