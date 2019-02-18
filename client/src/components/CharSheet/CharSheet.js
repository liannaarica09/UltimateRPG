import React, { Component } from 'react';

export class CharSheet extends Component {
    render() {
        return (
            <div className="charSheet">
                {this.props.children}
            </div>
        );
    }
}
