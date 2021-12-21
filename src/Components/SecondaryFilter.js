import React, {useState, useEffect} from 'react'

const SecondaryFilter = ({ label, i, delFilter }) => {
    const [id, setId] = useState(i);

    useEffect(() => {
        console.log(i);

    })
    return (
        <div className="secondary_filter">
            <div className="secondary_filter_text">{label}</div>
            <div className="filter_delete_button" onClick={() => delFilter(i)}><i className='fas fa-times' /></div>
        </div>
    )
}

export default SecondaryFilter
