import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

export default class Navigation extends Component {
    render() {
        return (
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
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/new" className="nav-link">New User</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/in" className="nav-link">Inside Site</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/out" className="nav-link">Ousite Site</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
