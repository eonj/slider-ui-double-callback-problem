import React from 'react'
import { makeStyles, } from '@material-ui/core/styles'

const useStyles = makeStyles({
  top: {
    margin: 0,
    padding: 0,
    height: '100%',
  },
})

export default function App() {

  const classes = useStyles()

  return (
    <div className={classes.top}>
      hello, world
    </div>
  )
}
