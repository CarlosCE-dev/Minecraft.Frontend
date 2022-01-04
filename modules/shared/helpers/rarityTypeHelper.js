const rarityTypes = {
    0: "Common",
    1: "Uncommon",
    2: "Rare",
    3: "Epic",
    4: "Legendary",
    5: "Mythic",
}

/**
 * Gift cost by rarity
 */
const rarityGiftCost = {
    0: 5,
    1: 5,
    2: 10,
    3: 10,
    4: 20,
    5: 20,
}

const hexColorRarity = {
    0: "#989898",
    1: "#2F8D31",
    2: "#4B4FF0",
    3: "#974AB7",
    4: "#EAA91A",
    5: "#F4CA2C",
}
/**
 * Reward stock available for each type
 */
 const stockPerRarity = {
    0: 5,
    1: 5,
    2: 3,
    3: 2,
    4: 1,
    5: 1
};

const getNameOfRarity = (rarityType) => {
    return rarityTypes[parseInt(rarityType)];
}

/**
 * Get a stock based on the rarity type
 * @param rarityType The rarity type needed
 * @returns A number the indicate the stock available of a prize
 */
const getStockPerRarity = (rarityType) => {
    return stockPerRarity[parseInt(rarityType)];
}

const getAmountByGift = (rarityType) => {
    return rarityGiftCost[parseInt(rarityType)];
}

const getHexColorOfRarity = (rarityType) => {
    return hexColorRarity[parseInt(rarityType)];
}

export {
    getNameOfRarity,
    getStockPerRarity,
    getAmountByGift,
    getHexColorOfRarity
}