import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusSquare, faPlusSquare } from '../../../../node_modules/@fortawesome/free-solid-svg-icons';
import Modal from "../../components/Modal";

class Incrementer extends Component {

    render() {
        const name = this.props.name.charAt(0).toUpperCase() + this.props.name.substr(1);
        return (
            <div id="incDiv">
                <p className="hoverTrig">{name}</p>
                <Modal>
                    <p>{this.props.description}</p>
                </Modal>
                <div className="thirds">
                    <FontAwesomeIcon icon={faMinusSquare} onClick={() => this.props.handleClick(this.props.index, this.props.cat, '-')} />
                    <div>{this.props.value}</div>
                    <FontAwesomeIcon icon={faPlusSquare} onClick={() => this.props.handleClick(this.props.index, this.props.cat, '+')} />
                </div>
            </div>
        );
    }
}

export default Incrementer;
