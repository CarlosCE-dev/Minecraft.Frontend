const rarityTypes = {
    0: "Common",
    1: "Uncommon",
    2: "Rare",
    3: "Epic",
    4: "Legendary",
    5: "Mythic",
}

const getNameOfRarity = (rarityType) => {
    return rarityTypes[parseInt(rarityType)];
}

export {
    getNameOfRarity
}