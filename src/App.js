import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { setUser } from './redux/actions'
import './App.css';
import Main from './Main';
import SignIn from './SignIn';
import base, { auth } from './base'

class App extends Component {
  constructor() {
    super()
  
    this.state = {
      users: {}
    }
  }

  componentDidMount() {
    base.syncState('users', {
      context: this,
      state: 'users',
    })

    //listen for auth state change - sign-in is a change, sign-out is a change
    auth.onAuthStateChanged(user => {
      if (user) {
        //user is signed in
        this.handleAuth(user)
      } else {
        //user is signed out
        this.afterSignOut()
      }
    })
  }

  handleAuth = (oAuthUser) => {
    const user = {
      uid: oAuthUser.uid,
      displayName: oAuthUser.displayName,
      email: oAuthUser.email,
      photoUrl: oAuthUser.photoURL
    }
    
    //add or update users list
    const users = { ...this.state.users }
    users[user.uid] = user
    
    this.props.setUser(user)
    this.setState({ users })
    localStorage.setItem('user', JSON.stringify(user))
  }

  afterSignOut = () => {
    this.props.setUser({ user: {} })
    localStorage.removeItem('user')
  }

  signedIn = () => {
    //truthy/falsey check for user if they are signed in
    //return undefined if they are not 'signed-in'
    return this.props.user.uid
  }

  signOut = () => {
    auth.signOut();
  }
  render() {

    const mainProps = {
      users: this.state.users,
      signOut: this.signOut,
    }

    return (
      <div className="App">
        <Switch>
          <Route path="/sign-in"
            render={() => (
              this.signedIn()
                ? <Redirect to="/chat" />
                : <SignIn />)}
          />
          <Route path="/:roomtype/:roomName"
            render={routerProps => (
              this.signedIn()
                ? <Main
                  {...mainProps}
                  {...routerProps}
                />
                : <Redirect to="/sign-in" />
            )}
          />
          <Route path="/"
            render={routerProps => (
              this.signedIn()
                ? <Main
                  {...mainProps}
                  {...routerProps}
                />
                : <Redirect to="/sign-in" />
            )}
          />
          <Route
            render={() => (
              this.signedIn()
                ? <Redirect to="/" />
                : <Redirect to="sign-in" />
            )}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: (user) => {
      dispatch(setUser(user))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
