import React, {Component} from 'react';
import fire, {auth, googleProvider, facebookProvider, twitterProvider} from './fire';
import './App.scss';
import App from './App.js';
import { connect } from 'react-redux';

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
      this.props.dispatch({ type: 'LOGOUT' });
    });
  }
  login() {
    auth.signInWithPopup(googleProvider)
    .then((result) => {
      //const user = result.user;
      this.props.dispatch({ type: 'LOGIN' });
    });
  }
  render() {
    return (
      <div className="authorization">
        <div className="header">
          <h1>Treelection</h1>
          {this.props.user ?
            <button onClick={this.logout}>Log Out</button>
            :
            <button onClick={this.login}>Log In</button>
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Authorization);
