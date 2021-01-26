import Example0 from './Example0'
import Example1 from './Example1'
import Example2 from './Example2'
import Example3 from './Example3'
import Example4 from './Example4'
import Example5 from './Example5'
import Example6 from './Example6'
import Example7 from './Example7'

import React from 'react'
import { HashRouter, Link, Route, Redirect, Switch, } from 'react-router-dom'
import { makeStyles, } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: 0,
    height: '100%',
  },
  appbar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  drawerContainer: {
    overflow: 'auto'
  },
  contentContainer: {
    paddingLeft: 240,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

export default function App() {

  const classes = useStyles()

  const menu: Array<{ ref: string, label: string, component: () => JSX.Element, }> = [
    { ref: '/example0', label: 'Example 0', component: Example0, },
    { ref: '/example1', label: 'Example 1', component: Example1, },
    { ref: '/example2', label: 'Example 2', component: Example2, },
    { ref: '/example3', label: 'Example 3', component: Example3, },
    { ref: '/example4', label: 'Example 4', component: Example4, },
    { ref: '/example5', label: 'Example 5', component: Example5, },
    { ref: '/example6', label: 'Example 6', component: Example6, },
    { ref: '/example7', label: 'Example 7', component: Example7, },
  ]

  return (
    <div className={classes.root}>
      <HashRouter>
        <CssBaseline />
        <AppBar position='fixed' className={classes.appbar}>
          <Toolbar>
            <Typography variant='h6' component='h1' noWrap>
              Failure Demo
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant='permanent'
          classes={{ paper: classes.drawerPaper, }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <List>
              {menu.map(({ ref, label, }, ) => (
                <ListItem
                  component={Link}
                  button
                  key={ref}
                  to={ref}
                >
                  <ListItemText key={ref} primary={label} />
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
        <div className={classes.contentContainer}>
          <Toolbar />
          <main className={classes.content}>
            <Switch>
              <Redirect exact from='/' to='/example0' />
              {menu.map(({ ref, component, }) => (
                <Route exact path={ref} component={component} />
              ))}
            </Switch>
          </main>
        </div>
      </HashRouter>
    </div>
  )
}
