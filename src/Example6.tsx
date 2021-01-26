/**
 * authored by @cometkim
 */
import * as React from 'react';
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'

type State = {
  position: number,
  velocity: number,
};

const initialState: State = {
  position: 0,
  velocity: 0,
};

type Action = (
  | { type: 'TICK' }
  | { type: 'SET_VELOCITY', velocity: number }
  | { type: 'RESET_VELOCITIY' }
)

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'TICK':
      return { ...state, position: state.position + state.velocity }
    case 'SET_VELOCITY':
      return { ...state, velocity: action.velocity }
    case 'RESET_VELOCITIY':
      return { ...state, velocity: 0 }
  }
}

export default function Example6() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const interacting = state.velocity !== 0;
  React.useEffect(() => {
    function tick() {
      dispatch({ type: 'TICK' });
    }
    const timer = interacting && window.setInterval(tick, 100);
    return () => void (timer && window.clearInterval(timer));
  }, [interacting]);

  return (
    <div>
      <Typography paragraph>
        <strong>Example 6.</strong> position={state.position} velocity={state.velocity}
      </Typography>
      <Slider
        min={-8}
        max={+8}
        value={state.velocity}
        onChange={(_, v) => {
          if (typeof v === 'number') {
            dispatch({ type: 'SET_VELOCITY', velocity: v })
          }
        }}
        onChangeCommitted={() => {
          dispatch({ type: 'RESET_VELOCITIY' })
        }}
      />
    </div>
  )
}
