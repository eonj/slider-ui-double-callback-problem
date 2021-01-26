import { useState, useReducer, } from 'react'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'

export default function Example4() {

  const [ log, setLog, ] = useState('')
  const [ position, setPosition, ] = useState(0)
  const [ velocity, setVelocity, ] = useState(0)
  const [ composite, doComposite, ] = useReducer(
    (
      { offset, timer, counter, }: (
        { offset: number, timer: number, counter: number, }
      ),
      { action, arg, delegate, }: (
        { action: 'set-offset', arg: number, delegate?: never, } |
        { action: 'unset-offset', arg?: never, delegate?: never, } |
        { action: 'create-timer-set-offset', arg: number, delegate: () => number, } |
        { action: 'destroy-timer-unset-offset', arg?: never, delegate: (timer: number) => void, } |
        { action: 'count-up', arg?: never, delegate: (offset: number, counter: number, ) => void, } |
        never
      ),
    ) => {
      switch (action) {
        case 'set-offset':
          return { offset: arg! as number, timer, counter, }
        case 'unset-offset':
          return { offset: 0, timer, counter, }
        case 'create-timer-set-offset':
          if (timer === 0) {
            const timerMade = (delegate! as () => number)()
            return { offset: arg! as number, timer: timerMade, counter: 0, }
          } else {
            return { offset: arg! as number, timer, counter, }
          }
        case 'destroy-timer-unset-offset':
          (delegate! as (timer: number) => void)(timer)
          return { offset: 0, timer: 0, counter }
        case 'count-up':
          (delegate! as (offset: number, counter: number, ) => number)(offset, counter, )
          return { offset, timer, counter: counter + 1, }
        default:
          return { offset, timer, counter, }
      }
    },
    { offset: 0, timer: 0, counter: 0, },
  )

  const iterated = () => {

    doComposite({
      action: 'count-up',
      delegate: (offset, counter, ) => {
        setLog(log => `update: offset ${offset} counter ${counter}\n${log}`)

        setPosition(position => position + offset)
      },
    })
  }

  const handleChange = (e: object, v: number | number[]) => {

    if (typeof v !== 'number')
      return
    
    setVelocity(v)
    doComposite({
      action: 'create-timer-set-offset',
      arg: v,
      delegate: () => {
        const x = window.setInterval(iterated, 250)
        setLog(log => `velocity: ${v}; setInterval result: ${x}\n${log}`)
        return x
      }
    })
  }

  const handleChangeCommitted = (e: object, v: number | number[]) => {

    if (typeof v !== 'number')
      return

    setVelocity(0)
    doComposite({
      action: 'destroy-timer-unset-offset',
      delegate: (timer) => window.clearInterval(timer)
    })
  }

  return (
    <div>
      <Typography paragraph>
        <strong>Example 4.</strong> Using <code>useReducer</code> and suggested workarounds, but still (even more reproducible) with double timer creation. #timer={`${composite.timer}`} position={position} velocity={velocity}
      </Typography>
      <Slider
        min={-8}
        max={+8}
        value={velocity}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
      />
      <pre>
        {log}
      </pre>
    </div>
  )
}
