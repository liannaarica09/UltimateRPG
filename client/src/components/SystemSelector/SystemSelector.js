import React from 'react';

class SystemSelector extends React.Component {
    render(props) {
        return (
            <div>
                <h1>Chose your game system</h1>
                <ul>
                    {this.props.children}
                </ul>
            </div>
        )
    }
}

export default SystemSelector;