import React, { Component } from 'react';
// import { FontAwesomeIcon } from "../../../../node_modules/@fortawesome/react-fontawesome";
// import { faEdit } from "../../../../node_modules/@fortawesome/free-solid-svg-icons";

export class CharHeader extends Component {

    addStuff = () => {
        this.props.history.push("/create");
    }

    render() {
        return (
            <div id="charHeader">
                <h1>
                    {/* <FontAwesomeIcon icon={faEdit} onClick={this.addStuff} /> */}
                    Doctor Who
                </h1>
                <h2>{this.props.char}</h2>
                <h2>Story Points 12</h2>
            </div>
        );
    }
}
