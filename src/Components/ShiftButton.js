import React from 'react'

const ShiftButton = ({ adjustPos }) => {
    return (
        <div>
            <button onClick={adjustPos} className="shift_button">
                <i className="fa-circle"></i>
            </button>
        </div>
    )
}

export default ShiftButton
