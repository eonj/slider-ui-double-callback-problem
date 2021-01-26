import * as React from 'react'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
function useForceUpdate() {
  const [, forceUpdate] = React.useReducer(v => ++v, 0);
  return forceUpdate;
}

export default function Example8() {
  const [ position, setPosition, ] = React.useState(0)
  const [ velocity, setVelocity, ] = React.useState(0)
  const interacting = velocity !== 0

  type SliderChangeHandler = React.ComponentProps<typeof Slider>['onChange']
  const handleChange: SliderChangeHandler = (_, v) => {
    if (typeof v !== 'number') {
      return;
    }
    setVelocity(v);
  }

  const handleChangeCommitted = () => {
    setVelocity(0);
  }

  React.useEffect(() => {
    if (!interacting) {
      return;
    }
    window.requestAnimationFrame(() => {
      setPosition(position => position + velocity);
    })
  });

  return (
    <div>
      <Typography paragraph>
        <strong>Example 8.</strong> rAF. position={position} velocity={velocity}
      </Typography>
      <Slider
        min={-8}
        max={+8}
        value={velocity}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
      />
    </div>
  );
}
