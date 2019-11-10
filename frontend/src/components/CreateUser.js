import React, { Component } from 'react'
import axios from 'axios'
import "../App.css"

//validación de form
const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
    
    let valid = true;

    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });
    
    return valid;
};
//fin validación 



export default class CreateUser extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        users: [],
        formErrors: {
            name: "",
            email: "",
            password: ""
        }
    }

    async componentDidMount() {
        this.getUsers();

    }

    handleSubmit = e => {
        e.preventDefault();

        if (formValid(this.state)) {
            console.log(`
            --SUBMITTING--
            Name: ${this.state.name}
            Email: ${this.state.email}
            Password: ${this.state.password}
            usuarios: ${this.state.users}
          `);
          axios.post('http://localhost:4000/users', {
            name: this.state.name,
            password: this.state.password,
            email: this.state.email
        });
        this.setState({
            name: '',
            email: '',
            password: ''
        });
        this.getUsers();
        } else {
            console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
    };

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        switch (name) {
            case "name":
                formErrors.name =
                    value.length < 3 ? "minimum 3 characaters required" : "";
                break;
            case "email":
                formErrors.email = emailRegex.test(value)
                    ? ""
                    : "invalid email address";
                break;
            case "password":
                formErrors.password =
                    value.length < 6 ? "minimum 6 characaters required" : "";
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    };





    getUsers = async () => {
        const res = await axios.get('http://localhost:4000/users');

        this.setState({
            users: res.data
        });
    }
    render() {
        const { formErrors } = this.state;

        return (
            <div>

                <div className="wrapper">
                    <div className="form-wrapper">
                        <h1>Create Account</h1>
                        <form onSubmit={this.handleSubmit} noValidate>
                            <div className="name">
                                <label htmlFor="name">Name</label>
                                <input
                                    className={formErrors.name.length > 0 ? "error" : null}
                                    placeholder="Name"
                                    type="text"
                                    name="name"
                                    noValidate
                                    onChange={this.handleChange}
                                />
                                {formErrors.name.length > 0 && (
                                    <span className="errorMessage">{formErrors.name}</span>
                                )}
                            </div>
                            <div className="email">
                                <label htmlFor="email">Email</label>
                                <input
                                    className={formErrors.email.length > 0 ? "error" : null}
                                    placeholder="Email"
                                    type="email"
                                    name="email"
                                    noValidate
                                    onChange={this.handleChange}
                                />
                                {formErrors.email.length > 0 && (
                                    <span className="errorMessage">{formErrors.email}</span>
                                )}
                            </div>
                            <div className="password">
                                <label htmlFor="password">Password</label>
                                <input
                                    className={formErrors.password.length > 0 ? "error" : null}
                                    placeholder="Password"
                                    type="password"
                                    name="password"
                                    noValidate
                                    onChange={this.handleChange}
                                />
                                {formErrors.password.length > 0 && (
                                    <span className="errorMessage">{formErrors.password}</span>
                                )}
                            </div>
                            <div className="createAccount">
                                <button type="submit">Create Account</button>
                                <small>Already Have an Account?</small>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
