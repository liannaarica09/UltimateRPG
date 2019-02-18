import React, { Component } from 'react';
// import { FontAwesomeIcon } from "../../../../node_modules/@fortawesome/react-fontawesome";
// import { faEdit } from "../../../../node_modules/@fortawesome/free-solid-svg-icons";

export class CharHeader extends Component {

    addStuff = () => {
        this.props.history.push("/create");
    }

    render() {
        return (
            <div className="charHeader">
                <div>
                    {/* <FontAwesomeIcon icon={faEdit} onClick={this.addStuff} /> */}
                    Doctor Who
                </div>
                <div>{this.props.char}</div>
                <div>Story Points 12</div>
            </div>
        );
    }
}
