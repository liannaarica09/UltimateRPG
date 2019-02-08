import React from 'react';

class SystemItem extends React.Component {

    // componentDidMount() {
    //     console.log(this.props.value);
    // }

    render() {
        return (
            <li onClick={() => this.props.handleClick(this.props.value)} > {this.props.value} </li>
        )
    }
}

export default SystemItem;