import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navigation from './components/Navigation'
import CreateUser from './components/CreateUser'
import Login from './components/Login'
import SiteIn from './components/SiteIn'
import SiteOut from './components/SiteOut'

import './App.css';

function App() {
  return (
    <Router>
      <Navigation />
      <div className="container p-4">
        
        <Route path="/new" component={CreateUser} />
        <Route path="/login" component={Login} />
        <Route path="/in" component={SiteIn} />
        <Route path="/out" component={SiteOut} />
      </div>
    </Router>
  );
}

export default App;
