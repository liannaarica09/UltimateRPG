import React, { Component } from 'react';

export class Traits extends Component {

    componentDidMount() {
        console.log(this.props);
    }
    render() {
        return (
            <div className="trait">
                <h3>Traits</h3>
                {this.props.children}</div>
        );
    }
}