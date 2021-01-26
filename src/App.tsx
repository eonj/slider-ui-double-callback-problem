import Example0 from './Example0'
import Example1 from './Example1'
import Example2 from './Example2'
import Example3 from './Example3'
import Example4 from './Example4'
import Example5 from './Example5'

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
              <ListItem
                component={Link}
                button
                key='/example0'
                to='/example0'
              >
                <ListItemText key='/example0' primary={'Example 0'} />
              </ListItem>
              <ListItem
                component={Link}
                button
                key='/example1'
                to='/example1'
              >
                <ListItemText key='/example1' primary={'Example 1'} />
              </ListItem>
              <ListItem
                component={Link}
                button
                key='/example2'
                to='/example2'
              >
                <ListItemText key='/example2' primary={'Example 2'} />
              </ListItem>
              <ListItem
                component={Link}
                button
                key='/example3'
                to='/example3'
              >
                <ListItemText key='/example3' primary={'Example 3'} />
              </ListItem>
              <ListItem
                component={Link}
                button
                key='/example4'
                to='/example4'
              >
                <ListItemText key='/example4' primary={'Example 4'} />
              </ListItem>
              <ListItem
                component={Link}
                button
                key='/example5'
                to='/example5'
              >
                <ListItemText key='/example5' primary={'Example 5'} />
              </ListItem>
            </List>
          </div>
        </Drawer>
        <div className={classes.contentContainer}>
          <Toolbar />
          <main className={classes.content}>
            <Switch>
              <Redirect exact from='/' to='/example0' />
              <Route exact path='/example0' component={Example0} />
              <Route exact path='/example1' component={Example1} />
              <Route exact path='/example2' component={Example2} />
              <Route exact path='/example3' component={Example3} />
              <Route exact path='/example4' component={Example4} />
              <Route exact path='/example5' component={Example5} />
            </Switch>
          </main>
        </div>
      </HashRouter>
    </div>
  )
}
