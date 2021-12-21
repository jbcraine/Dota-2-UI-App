import React, {useState, useEffect} from 'react'
import AttributeButton from './AttributeButton'
import AttributeList from './AttributeList'
import SecondaryFilter from './SecondaryFilter'
import SecondaryFiltersMenu from './SecondaryFiltersMenu'
import SearchBox from './SearchBox';

const FiltersBar = ({ setAttribute, addSecondaryFilter, delSecondaryFilter, setOrderBy, getLimit, setAscending, secondaryFilters, setQuery }) => {

    const [limit, setLimit] = useState(122);

    useEffect(() => {
        getLimit(limit);
    }, [limit])

    //#region Primary Filters
    const attrF = (hero, s) => {
        return hero.attribute!==s;
    }

    const atckF = (hero, s) => {
        return hero.atck_type!==s;
    }

    const sexF = (hero, s) => {
        return hero.sex!==s;
    }
    
    const strF = function(hero) {return attrF(hero, "STR")};
    const agiF = function(hero) {return attrF(hero, "AGI")};
    const intF = function(hero) {return attrF(hero, "INT")};

    const meleeF = function(hero) {return atckF(hero, "Melee")}
    const rangeF = function(hero) {return atckF(hero, "Ranged")}

    const maleF = function(hero) {return sexF(hero, "M")}
    const femaleF = function(hero) {return sexF(hero, "F")}
    const noneF = function(hero) {return sexF(hero, "N")}

    //#endregion Primary Filters
    //#region Secondary Filters

    const onLimitChange = (v) => {
        let result = v.replace(/[^0-9]/, "");
        result=(result>122)?122:result;
        setLimit(result)
    }



    return (
        <div className="filter_bar">
            <div className="filter_bar_name_container">Filters</div>
            <div className="filters">
                <div className="dicrete_categories">
                    <div className="attributes_filter_container">
                        <AttributeButton c={"attribute_image"} image="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_strength.png" filter={strF} setAttribute={setAttribute}/>
                        <AttributeButton c={"attribute_image"} image="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_agility.png" filter={agiF} setAttribute={setAttribute}/>
                        <AttributeButton c={"attribute_image"} image="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_intelligence.png" filter={intF} setAttribute={setAttribute}/>
                    </div>
                    <div className="attack_style_filter_container">
                        <AttributeButton c={"attack_image"} image="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/melee.svg" filter={meleeF} setAttribute={setAttribute}/>
                        <AttributeButton c={"attack_image"} image="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/ranged.svg" filter={rangeF} setAttribute={setAttribute}/>
                    </div>
                    <div className="sex_filter_container">
                        <AttributeButton c={"gender_icon"} icon = {"fas fa-mars"} filter={maleF} setAttribute={setAttribute} />
                        <AttributeButton c={"gender_icon"} icon = {"fas fa-venus"} filter={femaleF} setAttribute={setAttribute}/>
                        <AttributeButton c={"gender_icon"} icon = {"fas fa-genderless"} filter={noneF} setAttribute={setAttribute}/>
                    </div>
                </div>
                <div className="continuous_categories">
                    <SecondaryFiltersMenu addFilter={addSecondaryFilter}/>
                    <div className="secondary_filter_list">
                        {secondaryFilters.map((sf) => <SecondaryFilter filter={sf.filter} label={sf.attrLabel + " " + sf.opLabel + " " + sf.value} delFilter={delSecondaryFilter} i={sf.id}/>)}
                    </div>
                </div>
                <div className="sortby">
                    <AttributeList select={(s) => setOrderBy(s.value)} showName={true}/>
                    <div className="limit_container">
                        <label htmlFor="limittext">Limit:</label>
                        <input 
                            className="text_input"
                            id="limittext" 
                            type="text" 
                            value={limit} 
                            onChange={(e) => onLimitChange(e.target.value)}
                            maxLength="3"
                        />
                    </div>
                    
                    <div className="radio_container" >
                        Ascending
                        <input className="radio" type="radio" id="ascending_button" name="sort" value="asc" onClick={() => setAscending(1)} defaultChecked="true"></input>
                    </div>
                    <div className="radio_container">
                        Descending
                        <input className="radio" type="radio" id="descending_button" name="sort" value="dsc" onClick={() => setAscending(-1)}></input>
                    </div>
                    <SearchBox getQuery={(q) => setQuery(q)}/> 
                </div>
                    
            </div>
        </div>
    )
}

export default FiltersBar
