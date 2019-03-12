import React, { Component } from 'react';
import './CharSheet.css';

export class CharSheet extends Component {
    render() {
        return (
            <div className="charSheet">
                {this.props.children}
            </div>
        );
    }
}
