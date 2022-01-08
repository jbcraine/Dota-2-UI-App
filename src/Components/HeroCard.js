import React, { useState, useEffect } from 'react'
import AbilityList from './AbilityList'
import CardPopout from './CardPopout';

const HeroCard = ({ hero, level, selected, select, index, currentPos}) => {
    //If the HeroCard is selected, then increase its scale.
    //Cards are selected when they are in the center of the deque
    const [attr, setAttr] = useState("");
    const [infoSelected, setInfoSelected] = useState(false)
    useEffect(() => {
        switch(hero.attribute)
        {
            case "STR":
                setAttr("https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_strength.png")
                break;
            case "AGI":
                setAttr("https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_agility.png")
                break;
            case "INT":
                setAttr("https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_intelligence.png")
                break;
            default:
                return;
        }
    }, [])

    //On deselect, setInfoSelected(false)
    useEffect(() => {
        setInfoSelected(false);
    }, [selected])


    return (
        <div className= {`card_container ${selected?`selected_card`:``}`} id = {level} onClick={select} >
            <div className={`card`}>
                <div className="card_outer">
                    <div className="info_button_container">
                        <i className="fas fa-info-circle" onClick={() => setInfoSelected(!infoSelected)} />
                    </div>
                    <div className="main_attribute_container">
                        <img className="main_attribute_image" src={attr} />
                    </div>
                    <div className="card_inner">
                        <div className="name_container">
                            <div className="hero_name">{hero.name.toUpperCase()}</div>
                        </div>
                    
                        <div className="hero_image_container">

                            <img className="hero_image" src={`portraits/${hero.name.toLowerCase().replaceAll(" ", "_").replace("'", "")}.png`} alt={hero.name + ".png"} />
                        </div>
                    </div>
                    {/*Map an array of abilities to create the ability bar*/}
                    <AbilityList  abilities={hero.abilities} />
                </div>
                
            </div>
            {selected&&infoSelected?(<CardPopout heroInfo={hero} />):(null)}
            
        </div>
    )
}

export default HeroCard
