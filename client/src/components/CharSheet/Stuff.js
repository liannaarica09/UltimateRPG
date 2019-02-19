import React, { Component } from 'react';

export class Stuff extends Component {
    componentDidMount() {
        console.log(this.props.children);
    }
    render() {
        return (
            <div className="stuff">
                {this.props.children}
            </div>
        );
    }
}