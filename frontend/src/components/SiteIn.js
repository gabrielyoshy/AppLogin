import React, { Component } from 'react'
import axios from 'axios'

export default class SiteIn extends Component {
    
    state = {
        name: '',
        users: []
    }

    async componentDidMount() {
        this.getUsers();

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
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            this.state.users.map(user => (
                                <li className="list-group-item list-group-item-action" key={user.id} onDoubleClick={() => this.deleteUser(user.id)}>
                                    {user.name}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
