import React, { Component } from 'react';

export class Traits extends Component {

    componentDidMount(){
        console.log(this.props);
    }
    render() {
        return (
            <div className="trait">{this.props.children}</div>
        );
    }
}