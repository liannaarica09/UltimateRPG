import React from 'react';

const DropItem = (props) => {
    return (
        <div className="dropItem" onClick={() => props.handleClick(props.id)}>{props.name}</div>
    );
}

export default DropItem;
