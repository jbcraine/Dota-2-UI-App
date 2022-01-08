import { waitFor } from '@testing-library/react'
import React, {useEffect, useState} from 'react'
import HeroCard from './HeroCard'
import ShiftButton from './ShiftButton'

const CardList = ({ heroes, pos, adjustPos, shiftPos, move}) => {

    const scrollActions = []
    const [executing, setExecuting] = useState(false)
    const [count, setCount] = useState(0);
    
    const scroll = (event) => {
        if (!executing)
        {
            adjustPos(event.deltaY);
            setExecuting(true)
            setTimeout(()=>setExecuting(false), 65);
        }
    }
    
    return (
        (<div className="hero_tape" onWheel={scroll}>

            {/*            
            <div id="button_container_left">
                <ShiftButton adjustPos={() => adjustPos(-1)}/>
            </div>
            <div id="button_container_right">
                <ShiftButton adjustPos={() => adjustPos(1)}/>
            </div>
            {*/}
            <div className="hero_list" >
                {heroes.map((hero, index) => hero!=null?(<HeroCard 
                    key = {hero._id} 
                    selected = {index === pos} 
                    level = {`${index - pos > 0 ? `right` : `left`}${Math.abs(index - pos)}`} 
                    hero = {hero} 
                    index = {index}
                    select={() => shiftPos(index)}
                    incrementPos={adjustPos}
                    currentPos={pos} 
                    move={move}
                />):(null))}
            </div>
        </div>)
    )
}

export default CardList
