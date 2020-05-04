import React, { Component } from 'react'
import axios from 'axios';

// react bootstrap components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { Link, Redirect } from "react-router-dom";

// user created components
import Dashboard from './Dashboard';
import Error from './Error';
import voiceStart from '../service/voice';

class Signinform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            userDetails: {},
            wrongCredential: false,
            isAuthenticated: false,
            fullName: 'test'
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        axios.get(
                `http://localhost:3000/users?loginId=${this.state.username}&password=${this.state.password}`
                )
                .then( (response) => {
                    // handle success
                    console.log(response.data);
                    if(response.data.length) {
                    this.setState({
                            isAuthenticated: Boolean(response.data.length), 
                            userDetails: {'userId': response.data[0]['userId'], 'fullName': response.data[0]['fullName'] }
                        }, () => {
                            this.props.history.push('/dashboard', this.state.userDetails)
                            localStorage.setItem('userId', this.state.userDetails.userId)
                        });
                    } else {
                        this.setState({
                            wrongCredential: !Boolean(response.data.length),
                        })
                    }
                    let customEvent = new CustomEvent('login_status', {detail: response.data});
                    // Dispatch the event.
                    document.getElementsByTagName('body')[0].dispatchEvent(customEvent);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        e.preventDefault();
    }


    enableVoice = () => {
        console.log('enableVoice', voiceStart)
        // voiceStart();
        // Listen for the event.
        document.getElementsByTagName('body')[0].addEventListener('login', (e) => { 
            console.log('test', e.detail) 
            this.setState({
                username: e.detail.username.toLowerCase(),
                password: e.detail.password.toLowerCase(),
            }, 
            () => { 
                console.log('update state', this.state)
                this.handleSubmit(e);
                }
            )
    }, false);
        
        
    }

    componentDidMount() {
        this.enableVoice();
    }

    render() {
        const { isAuthenticated, wrongCredential, userDetails } = this.state;
        return (
            
            
            isAuthenticated ? <Redirect to={{
                                            pathname: "/dashboard",
                                        }} /> 
            : 
                <>
                    
                    <h1>
                        Sign In
                    </h1>
                    {wrongCredential &&  <Error errorMsg="That username/password is incorrect. Try again!"/>}
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" name="username" onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" onChange={this.handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{marginRight: '10px'}}>
                        Submit
                    </Button>
                    <Link to="/signupform">Sign Up</Link>
                    </Form>
                </>
            )
    }
}

export default Signinform;