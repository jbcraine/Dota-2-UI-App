import React, { useState, useEffect } from 'react'

const AttributeButton = ({icon, filter, setAttribute }) => {

    const [ selected, setSelected ] = useState(true);

    return (
        <div className={`attribute_button ${selected?`selected`:``}`} onClick={() => {setAttribute(!selected, filter); setSelected(!selected);  }}>
            <img className="attribute_filter_icon" src={icon} />
        </div>
    )
}

export default AttributeButton
