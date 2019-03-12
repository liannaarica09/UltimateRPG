import React, { Component } from 'react';

export class Stuff extends Component {
    componentDidMount() {
        console.log(this.props.children);
    }
    render() {
        return (
            <div className="stuff">
                <h3>Stuff</h3>
                {this.props.children}
            </div>
        );
    }
}