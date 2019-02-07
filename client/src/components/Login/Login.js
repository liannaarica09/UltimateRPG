import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Login extends React.Component {
    state = {
        currentSelection: 'login',
        password: '',
        email: '',
        userName: '',
        confirmPassword: '',
        rememberMe: false,
        redirect: false,
        redirectPath: ''
    }

    getDisplayStyle = (formType) => {
        if (this.state.currentSelection === formType) {
            return { display: '' };
        } else {
            return { display: 'none' };
        }
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    toggleStateOnSelection = (event, selection) => {
        if (event) event.preventDefault();
        this.setState({
            currentSelection: selection,
            password: '',
            email: '',
            userName: '',
            confirmPassword: '',
            rememberMe: false
        })
    }

    showPasswordConfirmationAlert = () => {
        if (this.state.password !== this.state.confirmPassword) {
            return (
                <div className="alert alert-danger" role="alert">
                    <strong>Oh snap!</strong> Your passwords don't match.
				</div>
            )
        }
    }

    setRedirect = (path) => {
        this.setState({
            redirect: true,
            redirectPath: `/${path}`,
            currentSelection: path
        })
        console.log(this.state.redirect)
    }

    handleRegisterSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.userName);

        axios.post('/api/auth/register', {
            username: this.state.userName,
            password: this.state.password
        }).then(res => {
            console.log(res.data);
        })
        this.toggleStateOnSelection(null, 'login')
    }

    handleLoginSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.userName)
        axios.post('/api/auth/login', {
            username: this.state.userName,
            password: this.state.password
        }).then(res => {
            console.log(res.data);
            localStorage.setItem("userName", res.data.userName);
            localStorage.setItem("token", res.data.token);
            console.log(localStorage.getItem("userName"))
            this.setRedirect('play');
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirectPath} />
        }

        return (
            <div id="loginCentered">
                <div>
                    <div onClick={(e) => this.toggleStateOnSelection(e, 'login')} id="login-form-link">Login</div>
                    <div onClick={(e) => this.toggleStateOnSelection(e, 'register')} id="register-form-link">Register</div>
                </div>
                <form id="loginForm" style={this.getDisplayStyle('login')} onSubmit={this.handleLoginSubmit}>
                    Name:<br />
                    <input type="text" name="userName" value={this.state.userName} onChange={this.handleInputChange} /><br />
                    Password:<br />
                    <input type="text" name="password" value={this.state.password} onChange={this.handleInputChange} />
                    <input type="submit" id="loginSubmit" />
                </form>

                <form id="registerForm" style={this.getDisplayStyle('register')} onSubmit={this.handleRegisterSubmit}>
                    Name:<br />
                    <input type="text" name="userName" value={this.state.userName} onChange={this.handleInputChange} /><br />
                    Password:<br />
                    <input type="text" autoComplete="new-password" name="password" value={this.state.password} onChange={this.handleInputChange} /><br />
                    Confirm Password:<br />
                    <input type="text" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleInputChange} />
                    {this.showPasswordConfirmationAlert()}
                    <input type="submit" id="registerSubmit" />
                </form>
            </div >
        )
    }
}

export default Login;