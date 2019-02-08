import React from "react";

class Header extends React.Component {

    // componentDidMount() {
    //     console.log(this.props);
    // }

    handleLogout = () => {
        localStorage.removeItem("currentSystem");
        localStorage.removeItem("userName");
        localStorage.removeItem("token");
        this.props.history.push("/");
    }

    render() {
        return (
            <header>
                <h1>System: {this.props.sysValue}</h1>
                {this.props.children}
                <div onClick={this.handleLogout}>Logout</div>
            </header>
        )
    }
}

export default Header; 