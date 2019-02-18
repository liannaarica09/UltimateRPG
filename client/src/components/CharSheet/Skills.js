import React, { Component } from 'react';

export class Skills extends Component {
    render() {
        return (
            <div className="skills">
                <div>
                    <p>Athletics {this.props.athletics}</p>
                    <p>Convince {this.props.convince}</p>
                    <p>Craft {this.props.craft}</p>
                    <p>Fighting {this.props.fighting}</p>
                    <p>Knowledge {this.props.knowledge}</p>
                    <p>Marksman {this.props.marksman}</p>
                </div>
                <div>
                    <p>Medicine {this.props.medicine}</p>
                    <p>Science {this.props.science}</p>
                    <p>Subterfuge {this.props.subterfuge}</p>
                    <p>Survival {this.props.survival}</p>
                    <p>Technology {this.props.technology}</p>
                    <p>Transport {this.props.transport}</p>
                </div>
            </div>
        );
    }
}
