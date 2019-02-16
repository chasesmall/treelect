import React, {Component} from 'react';
import fire, {auth, googleProvider, facebookProvider, twitterProvider} from './fire';
import './App.scss';

class Authorization extends Component {
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
      <div className="authorization">
        <div className="header">
          <h1>Treelection</h1>
          {this.state.user ?
            <button onClick={this.logout}>Log Out</button>
            :
            <button onClick={this.login}>Log In</button>
          }
        </div>
      </div>
    )
  }
}

export default Authorization;
