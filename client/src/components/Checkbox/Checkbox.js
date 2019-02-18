import React from 'react';

class Checkbox extends React.Component {

    // componentDidMount() {
    //     console.log(this.props.children);
    // }

    render() {
        return (
            <div>{this.props.children}</div>
        )
    }
}

export default Checkbox;
