import React, {useState, useEffect} from 'react'

const AttributeList = ({select, showName}) => {
    
    const [index, setIndex] = useState(0);
    const [options, setOptions] = useState([
        {value:"name", label:"Alphabetical"},
        {value:"str_strt", label:"Base Strength"},
        {value:"agi_strt", label:"Base Agility"},
        {value:"int_strt", label:"Base Intelligence"},
        {value:"str_gain", label:"Strength Gain"},
        {value:"agi_gain", label:"Agility Gain"},
        {value:"int_gain", label:"Intelligence Gain"},
        {value:"max_dmg", label:"Damage"},
        {value:"move_spd", label:"Move Speed"},
        {value:"base_hp", label:"Starting HP"},
        {value:"base_mana", label:"Starting Mana"},
        {value:"hp_regen", label:"HP Regen"},
        {value:"mana_regen", label:"Mana Regen"},
        {value:"armor", label:"Base Armor"},
        {value:"BAT", label:"Base Attack Time"},
        {value:"atck_range", label:"Attack Range"},
        {value:"projectile_speed", label:"Projectile Speed"},
        {value:"day_vision", label:"Day Vision"},
        {value:"night_vision", label:"Night Vision"},
        {value:"turn_rate", label:"Turn Rate"}
    ])
    const [selected, setSelected] = useState(options[0]);

    
    useEffect(() => {
        select(selected);
        console.log(selected)
    }, [selected])
    

    useEffect(() => {
        if(!showName) setOptions([
        {value:"str_strt", label:"Base Strength"},
        {value:"agi_strt", label:"Base Agility"},
        {value:"int_strt", label:"Base Intelligence"},
        {value:"str_gain", label:"Strength Gain"},
        {value:"agi_gain", label:"Agility Gain"},
        {value:"int_gain", label:"Intelligence Gain"},
        {value:"max_dmg", label:"Damage"},
        {value:"move_spd", label:"Move Speed"},
        {value:"base_hp", label:"Starting HP"},
        {value:"base_mana", label:"Starting Mana"},
        {value:"hp_regen", label:"HP Regen"},
        {value:"mana_regen", label:"Mana Regen"},
        {value:"armor", label:"Base Armor"},
        {value:"BAT", label:"Base Attack Time"},
        {value:"atck_range", label:"Attack Range"},
        {value:"projectile_speed", label:"Projectile Speed"},
        {value:"day_vision", label:"Day Vision"},
        {value:"night_vision", label:"Night Vision"},
        {value:"turn_rate", label:"Turn Rate"}
        
        ])
        setSelected(options[0]);
        }, [])
    
    return (
        <div className="dropdown_filter_list">
            <select className="filter_dropdown_list" name="filters" id="filters"  onChange={(e) => setSelected(options.find((opt) => opt.value === e.target.value))}>
                {options.map((o) => <option value={o.value} label={o.label} />)}
            </select>
            
        </div>
    )
}

export default AttributeList