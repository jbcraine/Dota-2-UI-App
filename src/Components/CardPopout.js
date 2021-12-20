import React from 'react'

const CardPopout = ({ heroInfo, id }) => {
    return (
        <div className = "card_popout" id={id}>
            <div className= "hp_and_mana_container">
                    <div className= "hp_mana_bar" id= "hp">
                        <div className="base_value">{heroInfo.base_hp}</div>
                        <div className="regen_value">+{heroInfo.hp_regen}</div>
                    </div>
                    <div className= "hp_mana_bar" id= "mana">
                        <div className="base_value">{heroInfo.base_mana}</div>
                        <div className="regen_value">+{heroInfo.mana_regen}</div>
                    </div>
            </div>

            <div className= "column_barrier" />

            <div className= "damage_armor_speed_containers_container">
                <div className= "damage_armor_speed_container">
                    <div className= "stat">
                        <img src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react//heroes/stats/icon_damage.png" />
                        {heroInfo.min_dmg}{'-'}{heroInfo.max_dmg}
                    </div>
                    <div className= "stat">
                        <img src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react//heroes/stats/icon_attack_time.png" />
                        {heroInfo.BAT}
                    </div>
                    <div className="stat">
                        <img src= "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react//heroes/stats/icon_attack_range.png" />
                        {heroInfo.atck_range}
                    </div>
                    {heroInfo.projectile_speed != -1 ? (<div className="stat">
                        <img src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react//heroes/stats/icon_projectile_speed.png" />
                        {heroInfo.projectile_speed}
                    </div>):(null)}
                </div>

                <div className= "damage_armor_speed_container">
                    <div className= "stat">
                        <img src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react//heroes/stats/icon_armor.png" />
                        {heroInfo.armor}
                    </div>
                    <div className="stat">
                        <img src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react//heroes/stats/icon_movement_speed.png" />
                        {heroInfo.move_spd}
                    </div>
                    <div className="stat">
                        <img src= "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react//heroes/stats/icon_turn_rate.png" />
                        {heroInfo.turn_rate}
                    </div>
                    <div className="stat">
                        <img src= "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react//heroes/stats/icon_vision.png" />
                        {heroInfo.day_vision + '/' +heroInfo.night_vision}
                    </div>
                </div>
                
            </div>

            <div className= "column_barrier" />

            <div className= "attribute_holder_container">
                <div className= "attribute_holder">
                    <img className="attribute_img" src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_strength.png" />
                    <div className="base_stat">{heroInfo.str_strt}</div>
                    <div className="stat_gain">+{heroInfo.str_gain}</div>
                </div>
                <div className="attribute_holder">
                    <img className="attribute_img" src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_agility.png" />
                    <div className="base_stat">{heroInfo.agi_strt}</div>
                    <div className="stat_gain">+{heroInfo.agi_gain}</div>
                </div>
                <div className="attribute_holder">
                    <img className="attribute_img" src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_intelligence.png" />
                    <div className="base_stat">{heroInfo.int_strt}</div>
                    <div className="stat_gain">+{heroInfo.int_gain}</div>
                </div>
            </div>
        </div>
    )
}

export default CardPopout
