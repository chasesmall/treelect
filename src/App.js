import React, {Component} from 'react';
import fire, {auth, googleProvider, facebookProvider, twitterProvider} from './fire';
import './App.scss';
import { Switch, Route, Link } from 'react-router-dom';
import Header from './Header'
import Main from './Main'

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: '',
      username: '',
      items: [],
      user: null
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({user});
      }
    });
  }
  logout() {
    auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
  }
  login() {
    auth.signInWithPopup(googleProvider)
    .then((result) => {
      const user = result.user;
      this.setState({
        user
      });
    });
  }
  render() {
    return (
      <div>
        <div className="authorization">
          <div className="header">
            <h1>Treelection</h1>
            {this.state.user ?
              <div>
                <button onClick={this.logout}>Log Out</button>
                <div className="name">{this.state.user.displayName}</div>
              </div>
              :
              <button onClick={this.login}>Log In</button>
            }
          </div>
        </div>
        {this.state.user ?
          <Main />
          :
          <h2>Not logged in</h2>
        }
      </div>
    )
  }
}

export default App;
