import React, { useState, useEffect } from 'react'

const AttributeButton = ({image, icon, filter, setAttribute, c }) => {

    const [ selected, setSelected ] = useState(true);

    return (
        <div className={`attribute_button ${selected?`selected`:``}`} onClick={() => {setAttribute(!selected, filter); setSelected(!selected);  }}>
            {image 
                ? (<img className={`${c} ${selected?`selected_img`:``}`} src={image} />)
                : (null)
            }
            {icon
                ? (<i className={`${icon} ${c} ${selected?`selected_icon`:``}`}/>)
                : (null)
            }
        </div>
    )
}

export default AttributeButton
