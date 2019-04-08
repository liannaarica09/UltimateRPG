import React, { Component } from 'react';

export class Biodata extends Component {
    render() {
        return (
            <div className="biodata">
                <h3>Biodata</h3>
                <p>Portrait</p>
                <img src={this.props.url}></img>
                <p>Personal Goal</p>
                <p>{this.props.goal}</p>
                <p>Personality</p>
                <p>{this.props.personality}</p>
                <p>Background</p>
                <p>{this.props.background}</p>
            </div>
        );
    }
}

