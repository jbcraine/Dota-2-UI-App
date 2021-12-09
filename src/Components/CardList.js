import React, {useEffect, useState} from 'react'
import HeroCard from './HeroCard'
import ShiftButton from './ShiftButton'

const CardList = ({ heroes, pos, adjustPos, isLoading, setIsLoading }) => {

    const [count, setCount] = useState(0);

    useEffect (() => {
        if (count === heroes.length)
        {
            setIsLoading(false);
            console.log(heroes.length)
        }
        
    }, [count])

    const scroll = (event) => {
        event.preventDefault();
    
        if(event.deltaY > 0)
        {
            adjustPos(pos + 1);
        }
        else if(event.deltaY < 0)
        {
            adjustPos(pos - 1);
        }
    }


    return (
        isLoading
        ?(<div>Loading</div>)
        :(<div className="hero_tape" onWheel={scroll}>
            <div id="button_container_left">
                <ShiftButton adjustPos={() => adjustPos(pos - 1)}/>
            </div>
            <div id="button_container_right">
                <ShiftButton adjustPos={() => adjustPos(pos + 1)}/>
            </div>
            <div className="hero_list" >
                {heroes.map((hero, index) => <HeroCard key = {hero._id} selected = {index === pos} hero = {hero} index = {index} select={() => adjustPos(index)} />)}
                
            </div>
        </div>)
    )
}

export default CardList
