import React, { useState } from 'react'
import AttributeList from './AttributeList'
import OperatorList from './OperatorList';

const SecondaryFiltersMenu = ({addFilter}) => {
    const [selectedAttr, setSelectedAttr] = useState({value: "move_spd", label: "Move Speed"});
    
    const [selectedOp, setSelectedOp] = useState({value: "greaterthan", label: ">", fnc:(a, b) => a>b})
    const [value, setValue] = useState(0)
    
    const f = (hero) => {return selectedOp.fnc(hero[selectedAttr.value], value)}

    return (
        <div className="filters_list_container">
            <AttributeList select={(s) => setSelectedAttr(s)} showName={false} />
            <div className="operator_and_input">
                <OperatorList setSelectedOp={setSelectedOp}/>

                <form>
                    <input className="value_input_field" type="text" id="value" name="value" onChange={(e) => setValue(e.target.value)}></input>
                </form>

                <div className="secondary_filter_submit" onClick={() => {addFilter(
                    {id: Math.random()*100, 
                    filter: f, 
                    value:value, 
                    opLabel:selectedOp.label, 
                    attrLabel:selectedAttr.label}
                )}}/>
            </div>
        </div>
    )
}

export default SecondaryFiltersMenu
