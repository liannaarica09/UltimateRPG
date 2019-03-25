import React from 'react';

class Modal extends React.Component {

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        return (
            <div className="hoverCont">{this.props.children}</div>
        )
    }
}

export default Modal;