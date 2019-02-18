import React, { Component } from 'react';

export class Attributes extends Component {
    componentDidMount() {
        console.log(this.props);
    }
    render() {
        return (
            <div className="attributes">
                <p>Awareness {this.props.awareness}</p>
                <p>Coordination {this.props.coordination}</p>
                <p>Ingenuity {this.props.ingenuity}</p>
                <p>Presence {this.props.presence}</p>
                <p>Resolve {this.props.resolve}</p>
                <p>Strength {this.props.strength}</p>
            </div>
        );
    }
}
