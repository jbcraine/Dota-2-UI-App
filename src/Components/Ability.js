import React from 'react'

const Ability = ({ abilityName, abilityIcon, dist }) => {

    return (
        /*<div className = "ability_icon_container" style={{left: `calc(${d} - 60px)`}}>*/
        <div className = "ability_icon_container" >
            <img className = "ability_icon" src={abilityIcon} alt={abilityName}  />
        </div>
    )
}

export default Ability
