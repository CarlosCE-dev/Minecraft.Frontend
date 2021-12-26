import { EffectTypes } from "~/models/enums/EffectTypes";

const descriptionTextHelper = {
    [EffectTypes.speed]:"Increases walking speed; higher levels make the affected entity faster and increases the player's field of view when affected",
    [EffectTypes.slowness]:"Decreases walking speed; higher levels make the affected entity slower and decreases the player's field of view when affected",
    [EffectTypes.haste]:"Increases mining and attack speed, higher levels increase the player's mining and attack speed",
    [EffectTypes.mining_fatigue]:"Decreases mining and attack speed, higher levels decrease the player's mining and attack speed",
    [EffectTypes.strength]:"Increases melee damage, higher levels make the affected entity do more melee damage	",
    [EffectTypes.instant_health]:"Heals living entities, damages undead, higher levels heal more health and do more damage",
    [EffectTypes.instant_damage]:"Damages living entities, heals undead, higher levels do more damage and heal more health",
    [EffectTypes.jump_boost]:"Increases jump height and reduces fall damage, higher levels make the affected entity jump higher and reduces more fall damage",
    [EffectTypes.nausea]:"Wobbles and warps the screen",
    [EffectTypes.regeneration]: "Regenerates health over time, higher levels make health regenerate quicker",
    [EffectTypes.resistance]: "Reduces damage, higher levels reduce more damage",
    [EffectTypes.fire_resistance]: "Prevents the affected entity from taking damage due to Fire, lava and other sources of fire damage",
    [EffectTypes.water_breathing]: "Prevents drowning and lets the affected entity breathe underwater",
    [EffectTypes.invisibility]: "Grants invisibility, making the affected entity invisible (but not the item they hold or the armor they wear), and reduces other mobs' detection range for the affected entity, higher levels reduce other mobs' detection range more",
    [EffectTypes.blindness]: "Impairs vision and disables the ability to sprint and critical hit",
    [EffectTypes.night_vision]: "Lets the player see well in darkness and underwater",
    [EffectTypes.hunger]: "Increases food exhaustion, higher levels cause the player to starve quicker",
    [EffectTypes.weakness]: "Decreases melee damage, higher levels decrease more melee damage",
    [EffectTypes.poison]: "Inflicts damage over time (but can't kill), higher levels do more damage per second, doesn't affect undead",
    [EffectTypes.wither]: "Inflicts damage over time (can kill), higher levels do more damage per second",
    [EffectTypes.health_boost]: "Increases maximum health, higher levels give the affected entity more maximum health",
    [EffectTypes.absorption]: "Adds damage absorption (additional hearts that can't be regenerated), higher levels give more absorption",
    [EffectTypes.saturation]: "Restores hunger and saturation",
    [EffectTypes.glowing]: "Outlines the affected entity (can be seen through blocks)",
    [EffectTypes.levitation]: "Floats the affected entity upward",
    [EffectTypes.luck]: "Can increase chances of high-quality and more loot, higher levels increase the chances of better loot",
    [EffectTypes.unluck]: "Can reduce chances of high-quality and more loot, higher levels reduce the chance of good loot",
    [EffectTypes.conduit_power]: "Decreases falling speed and negates fall damage",
    [EffectTypes.dolphins_grace]: "Increases underwater visibility and mining speed, prevents drowning",
    [EffectTypes.bad_omen]: "Causes an illager raid to start upon entering a village (only received from an Illager captain upon its death), higher levels cause a more difficult raid‌",
    [EffectTypes.hero_of_the_village]: "Gives discounts on trades with villagers, and makes villagers throw items at the player depending on their profession",
    [EffectTypes.darkness]: "Darkens the players screen",
}

const getDescriptionForEffect = (effectType = 1) => {
    return descriptionTextHelper[effectType];
}



export {
    getDescriptionForEffect,
}