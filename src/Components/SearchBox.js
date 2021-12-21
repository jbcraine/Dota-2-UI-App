import React, { useState } from 'react'

const SearchBox = ( {getQuery} ) => {
    const [text, setText] = useState("")

    const onChange = (q) => {
        setText(q)
        getQuery(q)
    }

    return (
        <div className="search_container">
            <div className="search">
                <div className="search_image" ><i className="fas fa-search"></i></div>
                <form>
                    <input 
                        type='text' 
                        className='input_query'
                        placeholder=''
                        value={text}
                        onChange={(e) => onChange(e.target.value)}
                        autoFocus/>
                </form>
            </div>
        </div>
    )
}

export default SearchBox
