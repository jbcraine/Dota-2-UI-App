import React from 'react'
import Ability from './Ability'

const AbilityList = ( {key, abilities} ) => {
    let count = 0;
    let increment = 50;

    return (
        <div className="abilities_bar">
            {abilities.map((a) => <Ability key = {a._id} abilityName = {a.ability_name} abilityIcon = {a.ability_img} dist = {((count += 1) / abilities.length) * 100}/>)}
        </div>
    )
}

export default AbilityList
