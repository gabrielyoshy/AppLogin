import React, { Component } from 'react'
import axios from 'axios'

import { Link, Redirect } from 'react-router-dom'

export default class SiteIn extends Component {



    constructor(props) {
        super(props);
        this.state = {
            name: '',
            users: []
            }    
        }

    async componentDidMount() {
        await this.getUsers();

    }

    getUsers = async () => {
        const res = await axios.get('http://localhost:4000/users');

        this.setState({
            users: res.data
        });
    }


    deleteUser = async (userId) => {
        const response = window.confirm('are you sure you want to delete it?');
        if (response) {
            await axios.delete('http://localhost:4000/users/' + userId);
            this.getUsers();
        }
    }

    render() {
        return (
            <div className="row">
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Password</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map(user => (
                            <tr>
                                <th scope="row">{user.id}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td><button type="button" className="btn btn-danger" key={user.id} onClick={() => this.deleteUser(user.id)} >delete</button>
                                </td>
                            </tr>
                            ))
                        }
                    </tbody>
                </table>

                {!this.props.autorizado && <Redirect to='/login' />}
            </div>
        )
    }
}
