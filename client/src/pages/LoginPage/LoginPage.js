import React from "react";
import Login from "../../components/Login";
import { Redirect } from "react-router-dom";

class LoginPage extends React.Component {
    state = {
        email: "",
        userName: "",
        password: ""
    }

    handleInputChange = event => {
        // Destructure the name and value properties off of event.target
        // Update the appropriate state
        const { name, value } = event.target
        this.setState({
            [name]: value
        });
    };

    render() {
        if (localStorage.getItem('userName')) {
            return <Redirect to={'/play'} />
        }

        return (
            <React.Fragment>
                <div id="loginDiv">
                    <Login />
                </div>
            </React.Fragment>
        )
    }
}

export default LoginPage;