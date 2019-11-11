import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

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
                <Navigation />
                <div className="container p-4">
                    {this.state.User_Auth.auth ? "Yes" : "No"}
                    <Route path="/new" component={CreateUser} />
                    <Route path="/login" render={ (props) => <Login setUser={this.setUser} {...props} /> }/>
                    <Route path="/in" component={ (props) => <SiteIn setUser={this.setUser} autorizado={this.state.User_Auth.auth} /> } />
                    <Route path="/out" component={SiteOut} />
                </div>
            </Router>
        )
    }
}