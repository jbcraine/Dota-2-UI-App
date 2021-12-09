import React from 'react'

const OperatorList = ({ setSelectedOp }) => {

    const operatorOptions = [
        {value:"greaterthan", label:">", fnc:(a, b) => a>b},
        {value:"lessthan", label:"<", fnc:(a, b) => a<b},
        {value:"equalto", label:"==", fnc:(a,b) => a===b},
        {value:"greaterthanequalto", label:">=", fnc:(a,b) => a>=b},
        {value:"lessthanequalto", label:"<=",fnc:(a,b) => a<=b}
    ]

    return (
        <div>
            <select className="operators_list" name="operators" id="operators" onChange={(e) => setSelectedOp(operatorOptions.find((i) => i.value === e.target.value))}>
                {operatorOptions.map((op) => <option value={op.value} label={op.label} />)}
            </select>
        </div>
    )
}

export default OperatorList
