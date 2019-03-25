import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'

import Auth from '../../lib/auth'

class Header extends React.Component {
  constructor() {
    super()

    this.state = { data: {} }

    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    this.getProfile()
  }

  logout() {
    Auth.logout()
    this.props.history.push('/')
  }


  getProfile() {
    axios.get('api/users', { headers: { Authorization: `Bearer ${Auth.getToken()}`} } )
      .then((user) => this.setState({...this.state, data: user.data}))
  }



  render() {
    {this.state && console.log(this.state.data)}
    return (
      <div>
        <header>
          {!Auth.isAuthenticated() &&
          <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Log In</Link>
            <Link to="/gameforum">Games</Link>
            <Link to="/createprofile">Profile</Link>
          </nav>
          }
          {Auth.isAuthenticated() &&
            <div className="contains-loggedin">
              <img className="avatar" src={this.state.data.avatar} alt=""/>
              <div className="userloggedin">
                <Link to='/viewprofile'> <h4> {this.state.data.username} </h4> </Link>
                <h5> currently playing... </h5>
                <a onClick={this.logout}>Logout</a>
              </div>
            </div>
          }
          <div className="contains-titleLogo">
            <h1>Player Connect</h1>
            <img src="https://i.pinimg.com/originals/aa/8d/46/aa8d4679b3b39e91b17cb4675ec0d60d.jpg" alt="playerconnect logo"/>
          </div>

        </header>
      </div>
    )
  }
}

export default withRouter(Header)
