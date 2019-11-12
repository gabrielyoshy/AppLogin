import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class SiteOut extends Component {


    constructor(props) {
        super(props);
        this.state = {
            login: false,
            rta:{}
        }
    }
    
    handleSubmit = async e => {
        e.preventDefault();
        console.log(this.state);
        
        await axios.get('http://localhost:4000/logout')
            .then(res => {
                this.props.setUser(res)
                
                this.setState({
                    rta: res.data
                });
            });
        console.log({message:'el resultado es', res: this.state.rta });    
        this.setState({login: false });    
    };
    


    render() {
        return (
        <div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Thank you for visiting</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Gabriel Pedrozo</h6>
                    <p className="card-text">You can login again from the login section.</p>
                    <a href="#" onClick={(e) => this.handleSubmit(e)}  class="card-link blue" >Logout</a>
                </div>
            </div>
            

                {!this.props.autorizado && <Redirect to='/login' />}
        </div>
            )
        }
    }
    