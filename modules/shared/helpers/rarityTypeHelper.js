const rarityTypes = {
    0: "Common",
    1: "Uncommon",
    2: "Rare",
    3: "Epic",
    4: "Legendary",
    5: "Mythic",
}

const rarityGiftCost = {
    0: 1,
    1: 5,
    2: 10,
    3: 15,
    4: 20,
    5: 25,
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

export {
    getNameOfRarity,
    getStockPerRarity,
    getAmountByGift
}