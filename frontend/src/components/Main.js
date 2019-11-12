import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Link, Redirect, withRouter } from 'react-router-dom'


import Navigation from './Navigation'
import CreateUser from './CreateUser'
import Login from './Login'
import SiteIn from './SiteIn'
import SiteOut from './SiteOut'

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.setUser = this.setUser.bind(this);
        this.state = {
            User_Auth:{
                auth:false
            }
        }
    }
      
    setUser = function(res){
        this.setState({
            User_Auth: res.data
        });
    } 

    render() {
        return (
            <Router>
                <React.Fragment>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
                        <div className="container">
                            <Link className="navbar-brand" to="/">
                                <i className="material-icons">
                                    assignment </i> Test Login
                            </Link>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav ml-auto">
                                    {!this.state.User_Auth.auth ?
                                    <li className="nav-item">
                                        <Link to="/login" className="nav-link">Login</Link>
                                    </li>
                                    : ""}
                                    <li className="nav-item">
                                        <Link to="/new" className="nav-link">New User</Link>
                                    </li>
                                    {this.state.User_Auth.auth ? 
                                        <li className="nav-item">
                                            <Link to="/in" className="nav-link">Inside Site</Link>
                                        </li>
                                    : ""} 
                                    {this.state.User_Auth.auth ? 
                                        <li className="nav-item">
                                            <Link to="/out" className="nav-link">Log Out</Link>
                                        </li>
                                    : ""} 
                                    
                                </ul>
                            </div>
                        </div>
                    </nav>
                </React.Fragment>
                <div className="container p-4">
                    <Route path="/new" component={CreateUser} />
                    <Route path="/login" render={ (props) => <Login setUser={this.setUser} {...props} /> }/>
                    <Route path="/in" component={ (props) => <SiteIn setUser={this.setUser} autorizado={this.state.User_Auth.auth} /> } />
                    <Route path="/out" component={ (props) => <SiteOut setUser={this.setUser} autorizado={this.state.User_Auth.auth} /> } />
                </div>
            </Router>
        )
    }
}