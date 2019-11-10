import React, { Component } from 'react'
import axios from 'axios'

export default class CreateUser extends Component {

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
    onChangename = e => {
        this.setState({
            name: e.target.value
        })
    }

    onSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:4000/users', {
            name: this.state.name,
            password: "aaaaa",
            email: "asdasdasdas"
        });
        this.setState({ name: '' });
        this.getUsers();
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
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>Create New User</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    value={this.state.name}
                                    type="text"
                                    onChange={this.onChangename}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Save
                    </button>
                        </form>
                    </div>
                </div>
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
