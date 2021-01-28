import * as React from 'react'
import { StyledComponentProps, } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'

type SliderChangeHandler = React.ComponentProps<typeof Slider>['onChange']

export interface Example9JogShuttleSliderProps extends StyledComponentProps<never> {

  steps: number,

  behavior: 'linear' | 'exponential',
  
  durationMillisPerStep: number,

  onChange: (offset: number) => void,

}

export function isExample9JogShuttleSliderProps(
  x?: any
): x is Example9JogShuttleSliderProps {

  if (typeof x !== 'object') {
    return false
  }

  const { steps, behavior, durationMillisPerStep, onOffset, } = x

  if (typeof steps !== 'number' || steps <= 0) {
    return false
  }

  if (typeof behavior !== 'string' || (behavior !== 'linear' && behavior !== 'exponential')) {
    return false
  }

  if (typeof durationMillisPerStep !== 'number' || durationMillisPerStep <= 0) {
    return false
  }

  if (typeof onOffset !== 'function') {
    return false
  }

  return true
}

type State = {
  committed: boolean,
  offset: number,
  prevOffset: number,
  accumulated: number,
  prevUpdate: number,
  lastNotify: number,
}

const closedState: State = ({
  committed: true,
  offset: 0,
  prevOffset: 0,
  accumulated: 0,
  prevUpdate: 0,
  lastNotify: 0,
})

const openState: () => State = () => ({
  ...closedState,
  committed: false,
  prevUpdate: performance.now(),
  lastNotify: performance.now(),
})

export default function Example9JogShuttleSlider(
  props: Example9JogShuttleSliderProps
) {

  if (!isExample9JogShuttleSliderProps(props)) {
    // todo
  }

  const [ state, setState, ] = React.useState(closedState)

  const handleChange: SliderChangeHandler = (_, v) => {
    if (typeof v !== 'number') {
      return
    }
    if (v !== state.offset) {
      if (state.lastNotify === 0) {
        setState({ ...(openState()), offset: v, prevOffset: state.offset, })
      } else {
        setState({ ...state, offset: v, prevOffset: state.offset, })
      }
    }
  }

  const handleChangeCommitted = () => {
    console.log(`onChangeCommit acc=${state.accumulated} pU=${state.prevUpdate} lN=${state.lastNotify}`)
    const change = state.accumulated / props.durationMillisPerStep
    props.onChange(Math.floor(change))
    setState(closedState)
  }

  React.useEffect(() => {
    if (state.committed) {
      return
    }
    const animFrameRequest = window.requestAnimationFrame((now) => {
      const change = (() => {
        switch (props.behavior) {
          case 'exponential':
            if (state.offset > 0)
              return 0 + (2 ** (-1 + state.offset))
            if (state.offset < 0)
              return 0 - (2 ** (-1 - state.offset))
            return 0
          case 'linear':
            return state.offset
        }
      })()
      if (state.prevOffset === 0) {
        setState({ ...state, prevOffset: state.offset, prevUpdate: now, })
      }
      if (now < state.lastNotify + props.durationMillisPerStep) {
        setState(
          ({ committed, offset, prevOffset, accumulated, prevUpdate, lastNotify, }) => ({
            committed,
            offset,
            prevOffset,
            accumulated: accumulated + change * (now - prevUpdate),
            prevUpdate: now,
            lastNotify,
          })
        )
      } else {
        setState(
          ({ committed, offset, prevOffset, accumulated, prevUpdate, lastNotify, }) => ({
            committed,
            offset,
            prevOffset,
            accumulated: accumulated + change * (now - prevUpdate - props.durationMillisPerStep),
            prevUpdate: now,
            lastNotify: lastNotify + props.durationMillisPerStep,
          })
        )
        props.onChange(change)
      }
    })
    return () => void window.cancelAnimationFrame(animFrameRequest)
  })

  return (
    <Slider
      track={false}
      min={0 - props.steps}
      max={0 + props.steps}
      step={1}
      marks={[
        { value: 0 - props.steps, label: '▼', },
        { value: 0 - 1, label: '－', },
        { value: 0, label: '◆', },
        { value: 0 + 1, label: '＋', },
        { value: 0 + props.steps, label: '▲', },
      ]}
      value={state.offset}
      onChange={handleChange}
      onChangeCommitted={handleChangeCommitted}
    />
  )
}
