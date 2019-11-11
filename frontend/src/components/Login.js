import React, { Component } from 'react'
import axios from 'axios'
import "../App.css"



export default class Login extends Component {
    state = {
        email: '',
        password: '',
        rta:{},
        formErrors: {
            name: "",
            email: "",
            password: ""
        },
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state);
        
         axios.post('http://localhost:4000/signin', {
                password: this.state.password,
                email: this.state.email
            }).then(res => {
                console.log(res);
                console.log(res.data);
                console.log(this.state.setUser);
                
                this.props.setUser(res)
                
                this.setState({
                    rta: res.data
                });
            });
        console.log({message:'el resultado es', res: this.state.rta });    
            


        

    };

    handleChange = e => {
        e.preventDefault(); 
        const { name, value } = e.target;
        this.setState({[name]: value });
    };


    

    render() {
        return (
            <div className="form-wrapper">
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit} noValidate>
                    <div className="email">
                        <label htmlFor="email">Email</label>
                        <input
                            placeholder="Email"
                            type="email"
                            name="email"
                            noValidate
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="password">
                        <label htmlFor="password">Password</label>
                        <input
                            placeholder="Password"
                            type="password"
                            name="password"
                            noValidate
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="createAccount">
                        <button type="submit">Login</button>
                    </div>
                </form>
                
            </div>
            )
        }
    }
    